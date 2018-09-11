const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Sightings = function(defaultYear){
  this.defaultYear = defaultYear;
  this.items = [];
  this.request = new Request('/api/sightings');
  this.sightingsByYear = [];
  this.chosenOption = "All";
};

Sightings.prototype.bindEvents = function(){
  PubSub.subscribe('SightingFormView:sighting-submitted', (event) => {
    const newSighting = event.detail;
    this.add(newSighting);
  });

  PubSub.subscribe('SliderView:selected-year-ready', (event) => {
    const selectedYear = event.detail;
    this.sightingsByYear = this.refilterByYear(selectedYear);
    PubSub.publish('Sightings:selected-year-data-ready', this.sightingsByYear);
  })

  PubSub.subscribe('Sightings:selected-year-data-ready', (event) => {
    this.sightingsByYear = event.detail;
    this.getPlottingData();
  });

  PubSub.subscribe('SelectView:chosen-country-ready', (event) => {
    this.chosenOption = event.detail;
    this.getPlottingData();
  });

};

Sightings.prototype.setUpInitialData = function(){
  this.request
    .get()
    .then((sightings) => {
      this.items = sightings;
      this.sightingsByYear = this.getDefaultYearData(this.defaultYear)
      PubSub.publish('Sightings:all-map-data-loaded', this.items);
      PubSub.publish('Sightings:selected-year-data-ready', this.sightingsByYear);
      this.years = this.getAllYears(this.items);
      PubSub.publish('Sightings:unique-years-array-ready', this.years);
    })
    .catch((err) => console.error(err));
}

Sightings.prototype.add = function(item){
  this.request
  .post(item)
  .then((sightings) => {
    this.items = sightings;
    PubSub.publish('Sightings:all-map-data-loaded', this.items);
  })
  .catch((err) => console.error(err));
}

Sightings.prototype.getDefaultYearData = function(year){
  PubSub.subscribe('Sightings:all-map-data-loaded', () => {
    this.sightingsByYear = this.items.filter(item => item.Startdateyear === year);
  })
}

Sightings.prototype.refilterByYear = function(year){
  return this.items.filter(item => item.Startdateyear === year);
}

Sightings.prototype.getPlottingData = function(){

  this.chartDataArray = this.createChartArray();

  if (this.chosenOption === "All"){
    var chartData = this.chartDataArray;
    var mapData = this.sightingsByYear;
  }
  else {
    var chartData = this.getChartDataByCountry(this.chartDataArray, this.chosenOption);
    var mapData = this.filterByCountry(this.chosenOption);
  }

  PubSub.publish('Sightings:selected-year-chart-data-ready', chartData);
  PubSub.publish('Sightings:selected-year-map-data-ready', mapData);
  PubSub.publish('Sightings:total-sightings-number-ready', mapData.length);
};

Sightings.prototype.filterByCountry = function(country){
  return this.sightingsByYear.filter(item => item["State/Province"] === country);
}

Sightings.prototype.filterByMonth = function(month, data){
  return data.filter(item => item["Startdatemonth"] === month).length;
}

Sightings.prototype.createChartArray = function(){
  const countries = ["Scotland", "England", "Northern Ireland", "Wales"];
  const dataArray = [];

  countries.forEach((country) => {
    const countryObject = this.createCountryObject(country);
    dataArray.push(countryObject);
  });
  return dataArray;
}

Sightings.prototype.createCountryObject = function(country){
  const countryObject = {
    name: `${country}`,
    data: []
  };

  const countrySightingsData = this.filterByCountry(country);
  const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  months.forEach((month) => {
    const sightingsByMonth = this.filterByMonth(month,countrySightingsData);
    countryObject.data.push(sightingsByMonth)
  });

  return countryObject;
}

Sightings.prototype.getChartDataByCountry = function(array, value){
  return array.filter(object => object.name === value);
}

Sightings.prototype.getAllYears = function(data){
  const allYears = [...new Set(data.map(object => object.Startdateyear))];
  return allYears.filter(year => year != "");
}

Sightings.prototype.getCountryName = function () {
  PubSub.subscribe('FormMapView:coords-ready', (event) => {
    this.lat = event.detail[0];
    this.long = event.detail[1];
    this.getCountryFromAPI(this.lat, this.long);
  });
};

Sightings.prototype.getCountryFromAPI = function (lat, long) {
  const request = new Request(`http://api.geonames.org/countrySubdivisionJSON?lat=${lat}&lng=${long}&username=supersquirrels`);
  request.get()
      .then((data) => {
        PubSub.publish('Sightings:Country-from-API', data.adminName1);
      })
      .catch((error) => {
        console.error(error);
      });
};


module.exports = Sightings;

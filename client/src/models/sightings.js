const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Sightings = function(){
  this.items = [];
  this.request = new Request('/api/sightings');
  this.sightingsByYear = [];
};

Sightings.prototype.setUpEventListeners = function(){
  PubSub.subscribe('SightingFormView:sighting-submitted', (event) => {
    const newSighting = event.detail;
    this.add(newSighting);
  });

  PubSub.subscribe('SliderView:selected-year-ready', (event) => {
    const selectedYear = event.detail;
    this.refilterByYear(selectedYear)
  })

};

Sightings.prototype.getSeededData = function(){
  this.request
    .get()
    .then((sightings) => {
      this.items = sightings;
      this.getDefaultYear(this.defaultYear)
      PubSub.publish('Sightings:all-map-data-loaded', this.items);
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

Sightings.prototype.getDefaultYear = function(year){
  PubSub.subscribe('Sightings:all-map-data-loaded', () => {
    this.sightingsByYear = this.items.filter(item => item.Startdateyear === year);
    PubSub.publish('Sightings:selected-year-data-ready', this.sightingsByYear);
  })
}

Sightings.prototype.refilterByYear = function(year){
  this.sightingsByYear = this.items.filter(item => item.Startdateyear === year);
  PubSub.publish('Sightings:selected-year-data-ready', this.sightingsByYear);
}

Sightings.prototype.getPlottingData = function(){
  PubSub.subscribe('Sightings:selected-year-data-ready', (event) => {
    this.sightingsByYear = event.detail;
    PubSub.publish('Sightings:selected-year-map-data-ready', this.sightingsByYear);
    const chartDataArray = this.createChartArray();
    PubSub.publish('Sightings:selected-year-chart-data-ready', chartDataArray);
    PubSub.publish('Sightings:total-sightings-number-ready', this.sightingsByYear.length);

    PubSub.subscribe('SelectView:chosen-country', (event) => {

      const chosenOption = event.detail;
      if (chosenOption === "All"){
        var chartData = chartDataArray;
        var mapData = this.sightingsByYear;
      }
      else {
        var chartData = this.getChartDataByCountry(chartDataArray, chosenOption);
        var mapData = this.filterByCountry(chosenOption);
      }
      PubSub.publish('Sightings:selected-year-chart-data-ready', chartData);
      PubSub.publish('Sightings:selected-year-map-data-ready', mapData);
      PubSub.publish('Sightings:total-sightings-number-ready', mapData.length);
    });
  });

};

Sightings.prototype.filterByCountry = function(country){
  return this.sightingsByYear.filter(item => item["State/Province"] === country);
}

Sightings.prototype.filterByMonth = function(month, data){
  return data.filter(item => item["Startdatemonth"] === month).length;
}

Sightings.prototype.createChartArray = function(){
  const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const countries = ["Scotland", "England", "Northern Ireland", "Wales"];

  const dataArray = [];

  countries.forEach((country) => {
    const countryObject = {
      name: `${country}`,
      data: []
    };

    const countrySightingsData = this.filterByCountry(country);

    months.forEach((month) => {
      const sightingsByMonth = this.filterByMonth(month,countrySightingsData);
      countryObject.data.push(sightingsByMonth)
    });

    dataArray.push(countryObject)
  });
  return dataArray;
}

Sightings.prototype.getChartDataByCountry = function(array, value){
  return array.filter(object => object.name === value);
}

Sightings.prototype.getAllYears = function(data){
  const allYears = [...new Set(data.map(object => object.Startdateyear))];
  return allYears.filter(year => year != "");
}

// Sightings.prototype.getEarliestYear = function(data){
//   const allYears = this.getAllYears(data);
//   return Math.min(...allYears);
// }
//
// Sightings.prototype.getLatestYear = function(data){
//   const allYears = this.getAllYears(data);
//   return Math.max(...allYears);
// }

module.exports = Sightings;

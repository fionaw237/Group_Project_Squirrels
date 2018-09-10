const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const SightingFormView = function(element){
  this.element = element;
  this.lat =[];
  this.long = [];
  this.country = "";
};

SightingFormView.prototype.setUpEventListeners = function(){

  PubSub.subscribe('FormMapView:coords-ready', (event) => {
    this.lat = event.detail[0];
    this.long = event.detail[1];
  });

  PubSub.subscribe('Sightings:Country-from-API', (event) => {
    this.country = event.detail;
    console.log("Selected Country is:", this.country);
  });


  this.element.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;

    const newSighting = {
      "Startdate": form['date-field'].value,
      "name": form['name-field'].value,
      "Startdateyear": form['date-field'].value.slice(0,4),
      "Startdatemonth": form['date-field'].value.slice(5,7),
      "Latitude(WGS84)": this.lat,
      "Longitude(WGS84)": this.long,
      "Individualcount": form['count-field'].value,
      "State/Province": form['country-field'].value
    };

    if (this.lat.length === 0 || this.long.length === 0) {
    alert ("No location detected - Please click on the map to place a location, or use 'Locate Me!' button.")}

    else if( confirm(`Do you wish to submit:
      Spotter Name: ${form['name-field'].value},
      Spotted In: ${this.country},
      Spotted On: ${form['date-field'].value},
      Number of Squirrels Spotted: ${form['count-field'].value}`))
      {
        // PubSub.publish('SightingFormView:sighting-submitted', newSighting);
        // form.reset();
        // window.location.replace("/");
        console.log(newSighting); }
    else {alert ("Sighting Not Submitted!")}
  });
};



module.exports = SightingFormView;

const PubSub = require('../helpers/pub_sub.js');

const SightingFormView = function(element){
  this.element = element;
  this.lat =[];
  this.long = [];
};

SightingFormView.prototype.setUpEventListeners = function(){

  PubSub.subscribe('FormMapView:coords-ready', (event) => {
    this.lat = event.detail[0];
    this.long = event.detail[1];
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
    alert ("Please click on the map to place a location") }
    else {
    console.log(newSighting)};

    // PubSub.publish('SightingFormView:sighting-submitted', newSighting);
    // form.reset();
    // window.location.replace("/")

  });
};

module.exports = SightingFormView;

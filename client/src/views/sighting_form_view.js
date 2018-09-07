const PubSub = require('../helpers/pub_sub.js');

const SightingFormView = function(element){
  this.element = element;
}

SightingFormView.prototype.setUpEventListeners = function(){
  this.element.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;

    const newSighting = {
      "Startdate": form['date-field'].value,
      "name": form['name-field'].value,
      "Startdateyear": null,
      "Startdatemonth": null,
      "Latitude(WGS84)": null,
      "Longitude(WGS84)": null,
      "Individualcount": form['count-field'].value,
      "State/Province": form['country-field'].value
    };

    PubSub.publish('SightingFormView:sighting-submitted', newSighting);
  });
};

module.exports = SightingFormView;

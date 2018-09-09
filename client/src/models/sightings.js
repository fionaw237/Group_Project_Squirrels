const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Sightings = function(){
  this.items = [];
  this.request = new Request('/api/sightings');
};

Sightings.prototype.setUpEventListeners = function(){
  PubSub.subscribe('SightingFormView:sighting-submitted', (event) => {
    const newSighting = event.detail;
    console.log(newSighting);
    this.add(newSighting);
  });
};

Sightings.prototype.getData = function(){
  this.request
    .get()
    .then((sightings) => {
      this.items = sightings;
      PubSub.publish('Sightings:all-map-data-loaded', this.items);
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

module.exports = Sightings;

const PubSub = require('../helpers/pub_sub.js');

const MapView = function(container){
  this.container = container;
}

MapView.prototype.getData = function(){
  PubSub.subscribe('Sightings:all-map-data-loaded', (event) => {
    console.log(event.detail);
  })
}

module.exports = MapView;

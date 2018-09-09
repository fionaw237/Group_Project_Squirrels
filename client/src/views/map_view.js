const PubSub = require('../helpers/pub_sub.js');

const MapView = function(container){
  this.container = container;

  this.coords = [55.0, -3.5]; //  centres default view to UK
  this.map = L.map(this.container);
  this.osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  this.map.setView(this.coords, 5).addLayer(this.osmLayer); // note '5' is zoom level
  this.mapMarkers = [];
};



MapView.prototype.bindEvents = function () {

  PubSub.subscribe('Sightings:all-map-data-loaded', (event) => {
    console.log(event.detail);
  })
};


module.exports = MapView;

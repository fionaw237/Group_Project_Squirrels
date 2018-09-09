const PubSub = require('../helpers/pub_sub.js');

const FormMapView = function(container){
  this.container = container;

  this.coords = [55.0, -3.5]; //  centres default view to UK
  this.map = L.map(this.container, {preferCanvas: true});
  this.osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  this.map.setView(this.coords, 5).addLayer(this.osmLayer); // note '5' is zoom level
  this.mapMarkers = [];
};



// FormMapView.prototype.bindEvents = function () {

  // //first clear this.markers of any markers in place
  //   for(var i = 0; i < this.mapMarkers.length; i++){
  //   this.map.removeLayer(this.mapMarkers[i]);
  //   }
  //
  //   //then add a new marker to the this.mapMarkers array and then the map
  //   const marker = L.marker(coordinates);
  //   this.mapMarkers.push(marker);
  //   marker.addTo(this.map);


module.exports = FormMapView;

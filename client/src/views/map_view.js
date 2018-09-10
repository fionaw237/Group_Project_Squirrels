const PubSub = require('../helpers/pub_sub.js');

const MapView = function(container){
  this.container = container;

  this.coords = [55.0, -3.5]; //  centres default view to UK
  this.map = L.map(this.container)//, {preferCanvas: true});
  this.osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  this.map.setView(this.coords, 5).addLayer(this.osmLayer); // note '5' is zoom level
  this.markerGroup = null;
};



MapView.prototype.bindEvents = function () {
console.log('in mapview bindEvents');
  PubSub.subscribe('Sightings:selected-year-map-data-ready', (event) => {
    const sightings = event.detail;

    if (this.markerGroup){
      this.map.removeLayer(this.markerGroup);
    }

    this.markerGroup = L.featureGroup();

    sightings.forEach((sighting) => {
      const lat = sighting["Latitude(WGS84)"];
      const long = sighting["Longitude(WGS84)"];
      const coords = [lat, long];

      L.circleMarker(coords, {
      }).addTo(this.markerGroup);

    });

    this.markerGroup.addTo(this.map);
  });

};


module.exports = MapView;

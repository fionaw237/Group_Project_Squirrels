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

      var customOptions =
      {
        'maxWidth': '400',
        'className': "map-pop-up"
      }

      const popUpLabel = this.getPopUpLabel(sighting);

      L.circleMarker(coords, { "radius": "5", "color": "#DE5E14"
      }).addTo(this.markerGroup).bindPopup(popUpLabel, customOptions)
      .openPopup();

    });

    this.markerGroup.addTo(this.map);
  });

};

MapView.prototype.getPopUpLabel = function(sighting){

  var label = ``;
  const categories = [["Startdate", "Date"], ["Individualcount", "Individuals"], ["Latitude(WGS84)", "Latitude"],
   ["Longitude(WGS84)", "Longitude"], ["name", "Spotted by"]];
  categories.forEach((category) => {
    if (sighting[category[0]]){
      label += `${category[1]}: ${sighting[category[0]]}, `
    }
  });

  label = label.slice(0, -2);
  return label;
}


module.exports = MapView;

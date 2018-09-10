const PubSub = require('../helpers/pub_sub.js');

const FormMapView = function(container){
  this.container = container;

  this.coords = [55.0, -3.5]; //  centres default view to UK
  this.map = L.map(this.container, {preferCanvas: true});
  this.osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  this.map.setView(this.coords, 5).addLayer(this.osmLayer); // note '5' is zoom level
  this.coords = [];

setTimeout(this.map.invalidateSize.bind(this.map))
}

FormMapView.prototype.bindEvents = function () {

  var markerGroup = L.featureGroup();

  this.map.on('click',
          function(e){

            markerGroup.clearLayers();
            const coord = e.latlng.toString().split(',');
            const lat = coord[0].split('(');
            const lng = coord[1].split(')');
            this.coords = [lat[1], lng[0].replace(/\s+/, "")]; //strips whitespace
            const marker = L.marker(this.coords);
            marker.addTo(markerGroup)
            markerGroup.addTo(this)


            PubSub.publish('FormMapView:coords-ready', this.coords);
  });
};


module.exports = FormMapView;

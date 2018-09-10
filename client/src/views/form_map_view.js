const PubSub = require('../helpers/pub_sub.js');

const FormMapView = function(container){
  this.container = container;
  this.coords = [55.0, -3.5]; //  centres default view to UK
  this.map = L.map(this.container, {preferCanvas: true});
  this.osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  this.map.setView(this.coords, 5).addLayer(this.osmLayer); // note '5' is zoom level
  this.map.markerGroup = L.featureGroup();


}

FormMapView.prototype.bindEvents = function () {

  const locateMeButton = document.querySelector('#locate-me-button');
  locateMeButton.addEventListener('click', () => {
    this.getLocation()
  });

  this.map.on('click',
          function(e){

            this.markerGroup.clearLayers();
            this.removeLayer(this.markerGroup);
            const coord = e.latlng.toString().split(',');
            const lat = coord[0].split('(');
            const lng = coord[1].split(')');
            const toPublish = [lat[1], lng[0].replace(/\s+/, "")]; //strips whitespace
            const marker = L.marker(toPublish);
            marker.addTo(this.markerGroup)
            this.markerGroup.addTo(this)
            console.log(toPublish);
            PubSub.publish('FormMapView:coords-ready', toPublish);
  });
};


FormMapView.prototype.onLocationFound = function(e) {
  this.markerGroup.clearLayers();
        const location = e.latlng
        L.marker(location).addTo(this.markerGroup)
        this.markerGroup.addTo(this)

        const coord = location.toString().split(',');
        const lat = coord[0].split('(');
        const lng = coord[1].split(')');
        const toPublish = [lat[1], lng[0].replace(/\s+/, "")]; //strips whitespace
        console.log(toPublish);
        PubSub.publish('FormMapView:coords-ready', toPublish);
     }

FormMapView.prototype.onLocationError =function(e) {
        alert(e.message);
     }

FormMapView.prototype.getLocation =function() {
        this.map.on('locationfound', this.onLocationFound);
        this.map.on('locationerror', this.onLocationError);

        this.map.locate({setView: true, maxZoom: 16});
     }




module.exports = FormMapView;

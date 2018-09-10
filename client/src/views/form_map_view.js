const PubSub = require('../helpers/pub_sub.js');

const FormMapView = function(container){
  this.container = container;

  this.coords = [55.0, -3.5]; //  centres default view to UK
  this.map = L.map(this.container, {preferCanvas: true});
  this.osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  this.map.setView(this.coords, 5).addLayer(this.osmLayer); // note '5' is zoom level
  this.mapMarkers = [];
  this.coords = [];

  // this.map.on('click',
  //         function(e){
  //           var coord = e.latlng.toString().split(',');
  //           var lat = coord[0].split('(');
  //           var lng = coord[1].split(')');
  //           this.coords = [lat[1], lng[0].replace(/\s+/, "")]; //strips whitespace
  //           });
}

FormMapView.prototype.bindEvents = function () {

  this.map.on('click',
          function(e){
            var coord = e.latlng.toString().split(',');
            var lat = coord[0].split('(');
            var lng = coord[1].split(')');
            this.coords = [lat[1], lng[0].replace(/\s+/, "")]; //strips whitespace

  PubSub.publish('FormMapView:coords-ready', this.coords);
  });
};


module.exports = FormMapView;

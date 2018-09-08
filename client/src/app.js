const Sightings = require('./models/sightings.js');
const SightingFormView = require('./views/sighting_form_view.js');
const MapView = require('./views/map_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#new-sighting-form');
  const sightingFormView = new SightingFormView(form);
  sightingFormView.setUpEventListeners();

  const sightingsData = new Sightings();
  sightingsData.setUpEventListeners();

  const mapView = new MapView();
  mapView.getData();

});

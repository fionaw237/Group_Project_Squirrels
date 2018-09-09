const Sightings = require('./models/sightings.js');
const SightingFormView = require('./views/sighting_form_view.js');
const MapView = require('./views/map_view.js');

const ChartView = require('./views/chart_view.js');

const MapView = require('./views/map_view.js');


document.addEventListener('DOMContentLoaded', () => {
  // const form = document.querySelector('#new-sighting-form');
  // const sightingFormView = new SightingFormView(form);
  // sightingFormView.setUpEventListeners();

  const mainChart = document.querySelector('#chart-container');
  const chartView = new ChartView(mainChart);
  chartView.bindEvents()

  const sightingsData = new Sightings();
  sightingsData.setUpEventListeners();

  const mainMap = document.querySelector('#map-container');
  const mapView = new MapView(mainMap);
  mapView.bindEvents();

});

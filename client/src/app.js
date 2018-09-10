const Sightings = require('./models/sightings.js');
const SightingFormView = require('./views/sighting_form_view.js');
const MapView = require('./views/map_view.js');
const FormMapView = require('./views/form_map_view.js');
const SelectView = require('./views/select_view.js');

const ChartView = require('./views/chart_view.js');


document.addEventListener('DOMContentLoaded', () => {

  const addButton = document.querySelector('#button-add-sighting');
  addButton.addEventListener('click', handleAddButtonClick);

  const infoButton = document.querySelector('#button-info');
  infoButton.addEventListener('click', handleInfoButtonClick);

  const spanClose = document.querySelector('.close');
  spanClose.addEventListener('click', handleSpanCloseClick);


  const select = document.querySelector('#country-select');
  const selectView = new SelectView(select);
  selectView.setUpEventListeners();

  const form = document.querySelector('#new-sighting-form');
  const sightingFormView = new SightingFormView(form);
  sightingFormView.setUpEventListeners();

  const formMap = document.querySelector('#form-map-container');
  const formMapView = new FormMapView(formMap);
  formMapView.bindEvents();

  const mainChart = document.querySelector('#chart-container');
  const chartView = new ChartView(mainChart);
  chartView.bindEvents();


  const mainMap = document.querySelector('#map-container');
  const mapView = new MapView(mainMap);
  mapView.bindEvents();

  const sightingsData = new Sightings();
  sightingsData.setUpEventListeners();
  sightingsData.getPlottingData();
  sightingsData.filterByYear("2017");
  sightingsData.getSeededData();

});


const handleAddButtonClick = function () {
document.getElementById('popup-container').style.display = "block";
document.getElementById('map-container').style.display = "none";
};


const handleInfoButtonClick = function () {
  document.getElementById('myPopUp')
  .style.display = "block";
  document.getElementById('map-container').style.display = "none";
};

const handleSpanCloseClick = function () {
  document.getElementById('myPopUp').style.display = "none";
  document.getElementById('map-container').style.display = "none";
  window.location.replace("/")
};

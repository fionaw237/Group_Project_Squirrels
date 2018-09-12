const Sightings = require('./models/sightings.js');
const SightingFormView = require('./views/sighting_form_view.js');
const MapView = require('./views/map_view.js');
const FormMapView = require('./views/form_map_view.js');
const SelectView = require('./views/select_view.js');
const ChartView = require('./views/chart_view.js');
const SliderView = require('./views/slider_view.js');
const TotalView = require('./views/total_view.js');
const YearView = require('./views/year_view.js');


document.addEventListener('DOMContentLoaded', () => {

  const addButton = document.querySelector('#button-add-sighting');
  addButton.addEventListener('click', handleAddButtonClick);

  const infoButton = document.querySelector('#button-info');
  infoButton.addEventListener('click', handleInfoButtonClick);

  const addClose = document.querySelector('#addClose');
  addClose.addEventListener('click', handleSpanCloseClick);

  const infoClose = document.querySelector('#infoClose');
  infoClose.addEventListener('click', handleSpanCloseClick);


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

  const defaultYear = "2017";

  const yearContainer = document.querySelector('#year-container');
  const yearView = new YearView(yearContainer, defaultYear);
  yearView.bindEvents();

  const totalContainer = document.querySelector('#total-container');
  const totalView = new TotalView(totalContainer);
  totalView.bindEvents();

  const mainMap = document.querySelector('#map-container');
  const mapView = new MapView(mainMap);
  mapView.bindEvents();

  const slider = document.querySelector('#year-slider');
  const sliderView = new SliderView(slider, defaultYear);
  sliderView.bindEvents();

  const sightingsData = new Sightings(defaultYear);
  sightingsData.bindEvents();
  sightingsData.setUpInitialData();
  sightingsData.getCountryName();

});


const handleAddButtonClick = function () {
  document.getElementById('popup-container').style.display = "block";
  document.getElementById('myPopUp').style.display = "none";
  formatBackground();
};


const handleInfoButtonClick = function () {
  document.getElementById('myPopUp')
  .style.display = "block";
  document.getElementById('popup-container').style.display = "";
  formatBackground();
};

const formatBackground = function(){
  const mapContainer = document.getElementById('map-container');
  mapContainer.innerHTML = "";
  mapContainer.style.backgroundColor = "#2B1403";
  const chartContainerWrapper = document.getElementById('chart-container-wrapper');
  chartContainerWrapper.innerHTML = "";
  chartContainerWrapper.style.backgroundColor = "#2B1403";
}

const handleSpanCloseClick = function () {
  window.location.replace("/")
};

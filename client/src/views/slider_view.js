const PubSub = require('../helpers/pub_sub.js');

const SliderView = function(element, defaultYear){
  this.element = element;
  this.defaultYear = defaultYear;
}

SliderView.prototype.bindEvents = function(){

  PubSub.subscribe('Sightings:unique-years-array-ready', (event) => {
    const sliderYears = event.detail.sort();

    this.element.min = Math.min(...sliderYears);
    this.element.max = Math.max(...sliderYears);
    this.element.value = this.defaultYear;

    this.element.addEventListener('change', (event) => {
      const selectedYear = event.target.value;
      PubSub.publish('SliderView:selected-year-ready', selectedYear);
    });
  });
}

module.exports = SliderView;

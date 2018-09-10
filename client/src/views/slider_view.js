const PubSub = require('../helpers/pub_sub.js');

const SliderView = function(element){
  this.element = element
}

SliderView.prototype.bindEvents = function(){

  PubSub.subscribe('Sightings:unique-years-array-ready', (event) => {
    const sliderYears = event.detail.sort();

    this.element.min = Math.min(...sliderYears);
    this.element.max = Math.max(...sliderYears);

    this.element.addEventListener('change', (event) => {
      const selectedYear = event.target.value;
      console.log(selectedYear);
      PubSub.publish('SliderView:selected-year-ready', selectedYear);
    })

  });





}

module.exports = SliderView;

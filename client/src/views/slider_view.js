const PubSub = require('../helpers/pub_sub.js');

const SliderView = function(element){
  this.element = element
}

SliderView.prototype.bindEvents = function(){

  PubSub.subscribe('Sightings:earliest/latest-year-data-ready', (event) => {
    this.earliestYear = event.detail[0];
    this.latestYear = event.detail[1];

    this.element.min = this.earliestYear;
    this.element.max = this.latestYear;

    this.element.addEventListener('change', (event) => {
      const selectedYear = event.target.value;
      PubSub.publish('SliderView:selected-year-ready', selectedYear);
    })

  });





}

module.exports = SliderView;

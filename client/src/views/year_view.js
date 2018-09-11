const PubSub = require('../helpers/pub_sub.js');

const YearView = function(container, defaultYear){
  this.container = container;
  this.currentYear = defaultYear;
}

YearView.prototype.bindEvents = function(){
  this.render();
  PubSub.subscribe('SliderView:selected-year-ready', (event) => {
    this.currentYear = event.detail;
    this.render();
  })
}

YearView.prototype.render = function(){
    this.container.innerHTML = "";
    const yearDisplay = document.createElement('text');
    yearDisplay.id = "year-display";
    yearDisplay.textContent = `Year: ${this.currentYear}`;
    this.container.appendChild(yearDisplay);
}

module.exports = YearView;

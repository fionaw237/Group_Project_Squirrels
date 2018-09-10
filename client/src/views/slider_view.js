const PubSub = require('../helpers/pub_sub.js');

const SliderView = function(element){
  this.element = element
}

SliderView.prototype.bindEvents = function(){
  this.element.addEventListener('change', (event) => {
    console.log(event.target.value);
  })
}

module.exports = SliderView;

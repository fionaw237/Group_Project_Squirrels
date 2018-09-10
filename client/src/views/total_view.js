const PubSub = require('../helpers/pub_sub.js')

const TotalView = function(container){
  this.container = container
}

TotalView.prototype.bindEvents = function(){
  PubSub.subscribe('Sightings:total-sightings-number-ready', (event) => {
    this.sightings = event.detail;
    this.render();
  });
}

TotalView.prototype.render = function(){
  const totalDisplay = document.createElement('p');
  while (this.container.children.length > 1){
    this.container.removeChild(this.container.lastChild)
  }
  totalDisplay.textContent = `Total sightings: ${this.sightings}`;
  this.container.appendChild(totalDisplay);
}



module.exports = TotalView;

const PubSub = require('../helpers/pub_sub.js');
const YearView = require('./year_view.js');

const TotalView = function(container){
  this.container = container;
}

TotalView.prototype.bindEvents = function(){

  PubSub.subscribe('Sightings:total-sightings-number-ready', (event) => {
    this.sightings = event.detail;
    this.render();
  });

}

TotalView.prototype.render = function(){
  this.container.innerHTML = "";
  const totalDisplay = document.createElement('text');
  totalDisplay.id = "total-display";
  totalDisplay.textContent = `Total sightings: ${this.sightings}`;
  this.container.appendChild(totalDisplay);
}
//
// TotalView.prototype.removeChildren = function(){
//   while (this.container.children.length > 1){
//     this.container.removeChild(this.container.lastChild)
//   }
// }



module.exports = TotalView;

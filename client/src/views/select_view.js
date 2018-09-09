const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (element) {
  this.element = element;

};


SelectView.prototype.setUpEventListeners = function () {
  this.element.addEventListener('change', (event) => {
    const chosenOption = event.target.value;
    PubSub.publish('SelectView:chosen-country', chosenOption);
  });
};


module.exports = SelectView;

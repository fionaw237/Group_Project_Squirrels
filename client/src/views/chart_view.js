const PubSub = require('../helpers/pub_sub.js')
const Highcharts = require('highcharts')

const ChartView = function(container){
  this.container = container;
  this.chartData = []
}

ChartView.prototype.bindEvents = function() {

    PubSub.subscribe('Sightings:selected-year-chart-data-ready', (event) => {
      this.chartData = event.detail;

        this.renderChart();

    })


}

ChartView.prototype.renderChart = function () {


const options = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Squirrel Sightings'
  },
  subtitle: {
    text: 'Source: registry.nbnatlas.org'
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Number of Sightings'
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y} squirrels</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },

  series: this.chartData

};

Highcharts.chart(this.container, options)
};

module.exports = ChartView;


var LinePlot = require('./linePlot').LinePlot;
var Table = require('./table').Table;
var Datamaps = require('./datamap').Datamaps;
var MetricsGraphics = require('./metricsgraphics').MetricsGraphics;
var NVD3Chart = require('./nvd3').NVD3Chart;


var ChartFactory = function(type) {

    if (typeof ChartFactory[type] != 'function'){
        throw new Error(type + ' is not a valid chart type.');
    }

    return ChartFactory[type];
};

ChartFactory.LinePlot = LinePlot;
ChartFactory.Table = Table;
ChartFactory.Datamaps = Datamaps;
ChartFactory.MetricsGraphics = MetricsGraphics;
ChartFactory.NVD3Chart = NVD3Chart;

const Chart = React.createClass({
    getDefaultProps: function() {
        return {
            type: React.PropTypes.string.isRequired,
            options: React.PropTypes.object
        };
    },
    update: function(params) {
        this.refs.chart._update(params);
    },
    render: function() {
        var Z = ChartFactory(this.props.type);
        return (
            <Z ref={"chart"} options={this.props.options} />
        );
    }
});

module.exports.Chart = Chart;



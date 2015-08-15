var TwoAxisFocus = require("./twoAxisFocus").TwoAxisFocus;
var PieChart = require("./pieChart").PieChart;

var NVD3Factory = function(type, options){
    var chart;

    if (typeof NVD3Factory[type] != 'function'){
        throw new Error(type + ' is not a valid NVD3 type.');
    }
    NVD3Factory.prototype = NVD3Factory[type].prototype;
    chart = new NVD3Factory[type]();
    chart.initialize(options);
    return chart;
}
NVD3Factory.TwoAxisFocus = TwoAxisFocus;
NVD3Factory.PieChart = PieChart;

var NVD3Chart = React.createClass({
    getDefaultProps: function() {
        return {
            options: React.PropTypes.object
        };
    },
    getInitialState: function() {
        return {
            chart: null
        };
    },
    componentDidMount: function() {
        this.setState({chart: this._initialize(this.state.chart)});
    },
    _initialize: function(chart) {
        chart = NVD3Factory(this.props.options.type,
            this.props.options);

        chart.get(this.props.options.chartid,
            this.props.options.url,
            this.props.options.init_params);

        return chart;

    },
    _update: function(params) {
        this.state.chart.get(this.props.options.chartid,
            this.props.options.url,
            params);
    },
    render: function() {
        return (
            <div id={this.props.options.chartid}><svg></svg></div>
        );
    }
});

module.exports.NVD3Chart = NVD3Chart;
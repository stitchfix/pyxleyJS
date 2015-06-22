
var LinePlot = React.createClass({
    getDefaultProps: function(){
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
        this.setState({chart: this._initialize(this.state.chart) });
    },
    _initialize: function(chart){
        chart = nv.models.lineChart()
            .margin(this.props.options.margin || {left: 100})
            .useInteractiveGuideline(true)
            .showLegend(true)
            .showYAxis(true)
            .showXAxis(true);

        chart.xAxis
            .axisLabel("X Axis")
            .tickFormat(d3.format(",r"));

        chart.yAxis
            .axisLabel("Y Axis")
            .tickFormat(d3.format(".02f"));

        d3.json(this.props.options.url,
            function(error, data){

                d3.select("#".concat(this.props.options.chartid, " svg"))
                    .datum(data.result)
                    .call(chart);
            }.bind(this));

        nv.utils.windowResize(function() { chart.update() } );
        return chart;

    },
    _update: function(params) {
        d3.json(this.props.options.url.concat("?", $.param(params)),
            function(error, data) {

            d3.select("#".concat(this.props.options.chartid, " svg"))
                .datum(data.result)
                .transition()
                .duration(500)
                .call(this.state.chart);
            nv.utils.windowResize(function() { this.state.chart.update() }.bind(this));
        }.bind(this));
    },
    render: function() {
        return (
            <div id={this.props.options.chartid}><svg></svg></div>
            );
    }
});

module.exports.LinePlot = LinePlot;
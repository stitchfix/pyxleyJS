
var LinePlot = require('./linePlot').LinePlot;
var Table = require('./table').Table;
var Filter = require('./filterFactory').Filter;
var Row = ReactBootstrap.Row;
var Button = ReactBootstrap.Button;
var Datamaps = require('./datamap').Datamaps;

var ChartFactory = function(type) {

    if (typeof ChartFactory[type] != 'function'){
        throw new Error(type + ' is not a valid chart type.');
    }

    return ChartFactory[type];
};

ChartFactory.LinePlot = LinePlot;
ChartFactory.Table = Table;
ChartFactory.Datamaps = Datamaps;

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


const FilterChart = React.createClass({
    getDefaultProps: function() {
        return {
            filters: React.PropTypes.array,
            filter_style: React.PropTypes.string,
            charts: React.PropTypes.array,
            dynamic: React.PropTypes.string
        };
    },
    _handleClick: function(input) {
        var params = {};
        for(var i = 0; i < this.props.filters.length; i++){
            var vals = this.refs["filter_".concat(i)].refs.filter.getCurrentState();
            for(var key in vals){
                params[key] = vals[key];
            }
        }
        if(input){
            for(var i = 0; i < input.length; i++){
                params[input[i].alias] = input[i].value;
            }
        }
        for(var i = 0; i < this.props.charts.length; i++){
            this.refs["chart_".concat(i)].update(params);
        }
        return params;
    },
    render: function(){
        var items = this.props.filters.map(function(x, index){
            return(<Filter
                ref={"filter_".concat(index)}
                onChange={this._handleClick}
                dynamic={this.props.dynamic}
                type={x.type} options={x.options}/>);
        }.bind(this));

        var charts = this.props.charts.map(function(x, index){
            return(<Chart
                ref={"chart_".concat(index)}
                type={x.type} options={x.options}/>);
        });
        return (
            <div>
                <Row>
                <div className={this.props.filter_style}>
                {this.props.dynamic ? null : <Button onClick={this._handleClick} >Update!</Button>}
                {items}
                </div>
                </Row>
                <Row>
                {charts}
                </Row>
            </div>
            );
    }
});

module.exports.FilterChart = FilterChart;
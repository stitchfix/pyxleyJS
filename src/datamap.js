

const Datamaps = React.createClass({
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
        this._initialize(this.props.options.params)
    },
    _initialize: function(params) {
        $.get(this.props.options.url.concat("?", $.param(params)),
            function(result){
                this.state.chart = new Datamap({
                    element: document.getElementById(this.props.options.chartid),
                    scope: 'usa',
                    fills: result.fills,
                    data: result.data
                });
        }.bind(this));
    },
    _update: function(params){
        $.get(this.props.options.url.concat("?", $.param(params)),
            function(result){
                this.state.chart.updateChoropleth(result.data);
        }.bind(this));
    },
    render: function() {
        return (
            <div id={this.props.options.chartid} className="pyDataMap"></div>
        );
    }

});

module.exports.Datamaps = Datamaps;
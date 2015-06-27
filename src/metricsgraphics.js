var MetricsGraphics = React.createClass({
    getDefaultProps: function(){
        return {
            options: React.PropTypes.object
        };
    },
    componentDidMount: function() {
        this._initialize(this.props.options.params.init_params);
    },
    _initialize: function(params) {
        d3.json(this.props.options.url.concat("?",$.param(params)),
            function(error, data){

                var options = this.props.options.params;
                if(data.date){
                    for(var i=0; i < data.result.length; i++){
                        data.result[i] = MG.convert.date(data.result[i], "x");
                    }
                }
                options.data = data.result;
                MG.data_graphic(options);
            }.bind(this));
    },
    _update: function(params) {
        d3.json(this.props.options.url.concat("?",$.param(params)),
            function(error, data){
                var options = this.props.options.params;
                if(data.date){
                    for(var i=0; i < data.result.length; i++){
                        data.result[i] = MG.convert.date(data.result[i], "x");
                    }
                }
                options.data = data.result;
                MG.data_graphic(options);
            }.bind(this));
    },
    render: function() {
        var width = {width: this.props.options.params.width};

        return (
            <div id={this.props.options.chart_id} style={width}></div>
            );
    }
});

module.exports.MetricsGraphics = MetricsGraphics;
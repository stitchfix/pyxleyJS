
import 'metrics-graphics/dist/metricsgraphics.css';
import React from 'react';
// import MG from 'metrics-graphics';

export class MetricsGraphics extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._initialize(this.props.options.params.init_params);
    }

    _initialize(params) {
        d3.json(this.props.options.url.concat("?", $.param(params)),
            function(error, data){

                var options = this.props.options.params;
                if(data.date){
                    for(var i=0; i < data.result.length; i++){
                        data.result[i] = MG.convert.date(data.result[i], "x",
                            this.props.options.date_format);
                    }
                }
                options.data = data.result;
                MG.data_graphic(options);
            }.bind(this)
        );
    }

    _update(params) {
        d3.json(this.props.options.url.concat("?",$.param(params)),
            function(error, data){
                var options = this.props.options.params;
                if(data.date){
                    for(var i=0; i < data.result.length; i++){
                        data.result[i] = MG.convert.date(data.result[i], "x",
                            this.props.options.date_format);
                    }
                }
                options.data = data.result;
                MG.data_graphic(options);
            }.bind(this)
        );
    }

    render() {
        var width = {width: this.props.options.params.width};

        return (
            <div id={this.props.options.chart_id} style={width}></div>
            );
    }
}

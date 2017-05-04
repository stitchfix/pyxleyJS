
import 'metrics-graphics/dist/metricsgraphics.css';
import React from 'react';
// import MG from 'metrics-graphics';

class MetricsGraphics extends React.Component {
    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(nextProps) {
        let {data} = nextProps;
        this._update(data);
    }

    _update(data) {

        if(data.result.length > 0){
            var options = this.props.options.params;

            if(data.date){
                for(var i=0; i < data.result.length; i++){
                    data.result[i] = MG.convert.date(data.result[i], "x",
                        this.props.options.date_format);
                }
            }
            options.data = data.result;
            MG.data_graphic(options);
        }

    }

    render() {
        var width = {width: this.props.options.params.width};

        return (
            <div id={this.props.options.chart_id} style={width}></div>
            );
    }
}

export {MetricsGraphics}

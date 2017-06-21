import React from 'react';
import ReactDOM from 'react-dom';

export class PlotlyAPI extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        let {data} = nextProps;
        this._update(data);
    }

    _update(result) {
        Plotly.newPlot(
            this.props.options.chartid,
            result.data,
            result.layout,
            result.config
        )

    }


    render() {
        return (
            <div>
            <div id={this.props.options.chartid}></div>
            </div>
        );
    }
}

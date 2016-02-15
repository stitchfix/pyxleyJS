import Plotly from 'plotly.js';
import React from 'react';

export class PlotlyAPI extends React.Component {
    constructor(props) {
        super(props);
    }

    _update(params) {
        var url = this.props.options.url.concat("?",
            $.param(params));
        $.get(url,
            function(result) {
                Plotly.newPlot(
                    this.props.options.chartid,
                    result.data,
                    result.layout
                )
            }.bind(this)
        );
    }

    componentDidMount() {
        this._update(this.props.options.params);
    }

    render() {
        return (
            <div id={this.props.options.chartid}></div>
        );
    }
}

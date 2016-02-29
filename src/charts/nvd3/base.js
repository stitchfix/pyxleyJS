import 'nvd3/build/nv.d3.min.css';

import React from 'react';
import TwoAxisFocus from './twoAxisFocus';
import PieChart from './pieChart';

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

export class NVD3Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null
        };
    }

    componentWillMount() {
        this.setState({
            chart: this._initialize(this.state.chart)
        });
    }

    _initialize(chart) {
        chart = NVD3Factory(this.props.options.type,
            this.props.options);

        chart.get(this.props.options.chartid,
            this.props.options.url,
            this.props.options.init_params);

        return chart;
    }

    _update(params) {
        this.state.chart.get(this.props.options.chartid,
            this.props.options.url,
            params);
    }

    render() {
        return (
            <div id={this.props.options.chartid}><svg></svg></div>
        );
    }
}

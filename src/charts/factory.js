import React from 'react';
import {MetricsGraphics} from './metricsgraphics/base.js';
import {NVD3Chart} from './nvd3/base.js';
import {Table} from './datatables/base.js';

var ChartFactory = function(type) {

    if (typeof ChartFactory[type] != 'function'){
        throw new Error(type + ' is not a valid chart type.');
    }

    return ChartFactory[type];
};


ChartFactory.MetricsGraphics = MetricsGraphics;
ChartFactory.Table = Table;
ChartFactory.NVD3 = NVD3Chart;

export class Chart extends React.Component {
    constructor(props) {
        super(props);
    }

    update(params) {
        this.refs.chart._update(params);
    }

    render() {
        var Z = ChartFactory(this.props.type);
        return (
            <Z ref={"chart"} options={this.props.options} />
        );
    }
}

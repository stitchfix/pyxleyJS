import React from 'react';
import {MetricsGraphics} from './metricsgraphics/base.js';
import {NVD3Chart} from './nvd3/base.js';
import {Table} from './datatables/base.js';
import {Datamaps} from './datamaps/base.js';
import {PlotlyAPI} from './plotly/base.js';

var ChartFactory = function(type) {

    if (typeof ChartFactory[type] != 'function'){
        throw new Error(type + ' is not a valid chart type.');
    }

    return ChartFactory[type];
};


ChartFactory.MetricsGraphics = MetricsGraphics;
ChartFactory.Table = Table;
ChartFactory.NVD3Chart = NVD3Chart;
ChartFactory.Datamaps = Datamaps;
ChartFactory.PlotlyAPI = PlotlyAPI;

class Chart extends React.Component {
    constructor(props) {
        super(props);
    }

    update(params) {
        this.refs.chart._update(params);
    }

    render() {
        var Z = this.props.factory(this.props.type);
        return (
            <Z ref={"chart"} options={this.props.options} />
        );
    }
}
Chart.defaultProps = {
    type: React.PropTypes.string,
    factory: ChartFactory,
    options: React.PropTypes.object
};

export {Chart};
export {ChartFactory};

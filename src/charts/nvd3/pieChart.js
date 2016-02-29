import React from 'react';
// import nv from 'nvd3';
import d3 from 'd3';

var PieChart = function() {
    this.chart = nv.models.pieChart();
}

PieChart.prototype.initialize = function(options){
    this.chart
        .x(function(d) { return d.label})
        .y(function(d) { return d.value })
        .showLabels(true)
        .labelType(options.labelType)
        .showLegend(true)
        .labelsOutside(false)
        .color(options.colors);

    this.chart.tooltip.contentGenerator(
        function(x){
            return '<h3 style="background-color: '+x.color+'">'+x.data.label+"</h3><p>"+x.data.value*100+"%</p>"
        });
};

PieChart.prototype.get = function(chartid, url, params){
    d3.json(url.concat("?", $.param(params)),
        function(error, result) {
            var svg = d3.select("#".concat(chartid, " svg"))
                .datum(result.data)
                .transition()
                .duration(500)
                .call(this.chart);
            nv.utils.windowResize(this.chart.update);

    }.bind(this));
};

export default PieChart;

import React from 'react';

import createPlotlyComponent from 'react-plotly.js/factory'
const Plot = createPlotlyComponent(Plotly);

export class PlotlyAPI extends React.Component {

    getPlotProps() {
        let props = {}
        if( "data" in this.props.data) {
            props.data = this.props.data.data || [],
            props.config = this.props.data.config || {},
            props.layout = this.props.data.layout || {},
            props.divId = this.props.id
            return props
        }
        return null

    }

    render() {
        let plotProps = this.getPlotProps()
        if( plotProps === null ){
            return <div/>
        }
        return (
            <Plot {...plotProps}/>
        );
    }
}

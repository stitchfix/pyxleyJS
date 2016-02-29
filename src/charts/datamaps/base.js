import React from 'react';

export class Datamaps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null
        };
    }

    componentDidMount() {
        this._initialize(this.props.options.params);
    }

    _initialize(params) {
        var url = this.props.options.url.concat("?", $.param(params));
        $.get(url,
            function(result){
                this.state.chart = new Datamap({
                    element: document.getElementById(this.props.options.chartid),
                    scope: 'usa',
                    fills: result.fills,
                    data: result.data
                });
        }.bind(this))
    }

    _update(params){
        var url = this.props.options.url.concat("?", $.param(params))
        $.get(url,
            function(result){
                this.state.chart.updateChoropleth(result.data);
        }.bind(this));
    }

    render() {
        return (
            <div
                id={this.props.options.chartid}
                className="pyDataMap">
            </div>
        );
    }

}

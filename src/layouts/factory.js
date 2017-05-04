
import React from 'react';
import {FilterChart} from './FilterChart';
import {SimpleChart} from './SimpleChart';

var LayoutFactory = function(type) {
    if (typeof LayoutFactory[type] != 'function'){
        throw new Error(type + ' is not a valid layout.');
    }

    return LayoutFactory[type];
};

LayoutFactory.FilterChart = FilterChart;
LayoutFactory.SimpleChart = SimpleChart;

class Layout extends React.Component {
    static get defaultProps() {
        return {
            layout_factory: LayoutFactory
        };
    }

    constructor(props) {
        super(props);
    }

    render() {
        var Z = this.props.layout_factory(this.props.type);
        return (
            <Z
                id={this.props.id}
                nav={this.props.nav}
                filters={this.props.filters}
                charts={this.props.charts} />
        );
    }
}



export {Layout, LayoutFactory};

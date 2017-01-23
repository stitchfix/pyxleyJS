
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
    constructor(props) {
        super(props);
    }

    render() {
        var Z = this.props.layout_factory(this.props.type);
        return (
            <Z
                ref={"layout"}
                id={this.props.id}
                nav={this.props.nav}
                filters={this.props.filters}
                charts={this.props.charts} />
        );
    }
}

Layout.defaultProps = {
    layout_factory: LayoutFactory
};

export {Layout, LayoutFactory};

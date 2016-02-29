import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export default class BaseFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            selected: 0
        };
    }

    getCurrentState() {
        var result = {};
        result[this.props.options.alias] = this.state.value ||
            this.props.options.default;
        return result;
    }
}

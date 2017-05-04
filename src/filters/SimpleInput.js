import React from 'react';
import { InputNumber } from 'antd';

class InputDecimal extends React.Component {
    constructor(props) {
        super(props);
    }

    _handleChange(value) {

        var result = {
            alias: this.props.options.alias,
            value: value,
            changed: false
        };
        this.props.onChange([result]);
    }

    render() {

        return (
            <div>
            {this.props.options.placeholder}
            <InputNumber
                id={this.props.id}
                min={1}
                max={100}
                step={0.1}
                onChange={this._handleChange.bind(this)}/>
            </div>
        );
    }
}

export {InputDecimal};

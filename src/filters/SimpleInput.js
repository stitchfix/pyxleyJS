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
        let props = {
            id: this.props.id,
            min: this.props.options.minValue || 0,
            max: this.props.options.maxValue || 100,
            step: this.props.options.step || 0.1,
            onChange: this._handleChange.bind(this)
        }
        if("defaultValue" in this.props.options){
            props["defaultValue"] = this.props.options.defaultValue
        }
        return (
            <div>
            {this.props.options.placeholder}
            <InputNumber {...props}/>
            </div>
        );
    }
}

export {InputDecimal};

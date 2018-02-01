import React from 'react';
import { InputNumber, Input } from 'antd';

const twoDecimals = (x) => {
    // x is a string, split on
    let tokens = x.split('.')
    if (tokens.length === 1){
        return x + '.00'
    }
    if (tokens[1].length === 1) {
        return x + '0'
    }
    return x
}

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
            onChange: this._handleChange.bind(this),
            disabled: this.props.options.disabled
        }
        if("defaultValue" in this.props.options){
            props["defaultValue"] = this.props.options.defaultValue
        }
        if("percent" in this.props.options) {
            props["formatter"] = (value) => {
                return (twoDecimals(`${value}`) + '%');
            }
        }
        if("price" in this.props.options){
            props["formatter"] = (value) => {
                return twoDecimals(`$ ${value}`)
            }
        }
        if("className" in this.props.options) {
            props["className"] = this.props.options.className
        }
        if("value" in this.props){
            props.value = this.props.value
        }
        return (
            <div>
            {this.props.options.showlabel ? this.props.options.placeholder : null}
            <InputNumber {...props}/>
            </div>
        );
    }
}


class InputText extends React.Component {
    constructor(props) {
        super(props);
    }

    _handleChange(e) {

        var result = {
            alias: this.props.options.alias,
            value: e.target.value,
            changed: false
        };
        this.props.onChange([result]);
    }

    render() {
        let props = {
            type: "text",
            id: this.props.id,
            onChange: this._handleChange.bind(this),
            onPressEnter: () => {}
        }
        if("value" in this.props){
            props.value = this.props.value
        }
        if("defaultValue" in this.props.options){
            props["defaultValue"] = this.props.options.defaultValue
        }
        return (
            <Input {...props}/>
        );
    }
}



export {InputDecimal, InputText};

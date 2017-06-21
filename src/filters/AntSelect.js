import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

class AntSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    _handleClick(value) {
        var result = {
            alias: this.props.options.alias,
            value: value,
            changed: this.props.value !== value
        };
        this.props.onChange([result]);
    }

    onKeyDown() {
        console.log("keydown")
    }

    render() {
        let options = this.props.options.items.map( (item, index) => {
            return (
                <Option key={index} value={item}>{item}</Option>
            );
        })
        let label = this.props.value || this.props.options.label;

        let style = {
            width: '75%',
            margin: 'auto',
            paddingBottom: '7px',
            paddingTop: '7px'
        }
        return (
            <Select
                defaultValue={label}
                style={style}
                onChange={this._handleClick.bind(this)}
                onKeyDown={this.onKeyDown}>
                {options}
            </Select>
        );
    }
}


class AntMultiSelect extends React.Component {
    constructor(props){
        super(props);
    }

    onKeyDown() {
    }

    _handleClick(value) {
        let _value = "";
        if(this.props.options.options.multi){

            let delimiter = this.props.options.options.delimiter;
            _value = value[0];
            for(let i = 1; i < value.length; i++){
                _value = _value.concat(delimiter, value[i])
            }
        } else {
            _value = value;
        }

        var result = {
            alias: this.props.options.alias,
            value: _value,
            changed: this.props.value !== _value
        };
        this.props.onChange([result]);
    }

    render() {
        let options = this.props.items.map( (item, index) => {
            let value = item.value || "";
            return (
                <Option key={value} value={value}>{item.label}</Option>
            );
        })

        let props = {
            style: this.props.options.options.style,
            onChange: this._handleClick.bind(this),
            placeholder: this.props.options.options.placeholder,
            notFoundContent: 'Not Found',
            onKeyDown: this.onKeyDown
        }
        if( this.props.value !== undefined &&
            this.props.value !== "" &&
            this.props.value !== null) {
            props.value = this.props.value.split("|");
        }

        if(this.props.options.options.multi){
            props.mode = "multiple"
        } else {
            props.showSearch = true;

        }

        return (
            <Select {...props}>
                {options}
            </Select>
        );
    }
}


export {AntSelect, AntMultiSelect};

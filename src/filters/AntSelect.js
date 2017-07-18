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
            let skipAll = this.props.options.options.skipAll || false;
            let delimiter = this.props.options.options.delimiter;
            _value = "";
            if(value[value.length - 1] !== "All"){
                for(let i = 0; i < value.length; i++){
                    if(value[i] === "All" && skipAll){
                        continue
                    }
                    if( i < (value.length - 1)){
                        _value = _value.concat(value[i], delimiter)
                    } else {
                        _value = _value.concat(value[i])
                    }
                }
            } else {
                _value = "All"
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

    parseItems(props, value){
        if(props.items.length > 0){
            let useValues = []
            let listItems = props.items.map(x => x.value)
            if(value !== undefined && value !== null && props.items.length > 0){
                let setValues = new Set(props.value.split("|"))
                useValues = listItems.filter(x => setValues.has(x))
            }

            if( useValues.length === 0 ){
                if(props.options.options.multi){
                    this._handleClick([listItems[0]])
                } else {
                    this._handleClick(listItems[0])
                }
            }
        }
    }

    componentDidMount() {
        if("items" in this.props && this.props.options.options.prepopulate){
            this.parseItems(this.props, this.props.value)
        }
    }

    componentWillReceiveProps(nextProps) {
        if("items" in nextProps && this.props.options.options.prepopulate){
            this.parseItems(nextProps, nextProps.value)
        }
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

        let title = null;
        if( "defaultValue" in this.props.options.options ){
            props.defaultValue = this.props.options.options.defaultValue
            title = (<p>{props.placeholder}</p>);
        }
        if(this.props.options.options.prepopulate){
            title = (<p>{props.placeholder}</p>);
        }
        if(this.props.options.options.multi){
            props.mode = "multiple"
        } else {
            props.showSearch = true;

        }


        return (
            <div className="pyxley-ant-select-multi">
            {title}
            <Select {...props}>
                {options}
            </Select>
            </div>
        );
    }
}

AntMultiSelect.defaultProps = {
    options: {
        prepopulate: false
    }
}

export {AntSelect, AntMultiSelect};

import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { fetchData } from '../utils/fetch'

const { RangePicker } = DatePicker;

const parseValue = (value) => {
    let tokens = value.split("|")
    if(tokens.length < 2){
        return [moment(), moment()]
    }
    return tokens.map( (x) => (moment(x, "YYYY-MM-DD")));
}

const convertToString = (value) => {
    let _value = "";
    if (value.length > 1){
        _value = value[0].format("YYYY-MM-DD").concat(
            "|", value[1].format("YYYY-MM-DD")
        )
    }
    return _value;
}

const parseRanges = (data) => {
    let ranges = {}
    for(let key in data) {
        ranges[key] = data[key].map((x) => (moment(x, "YYYY-MM-DD")))
    }
    return ranges;
}

class AntDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            ranges: [],
            clicked: false
        };
    }

    setRanges(json) {
        this.setState({
            ranges: json.data
        })
    }

    getRanges(url) {
        fetchData(
            url,
            {},
            (json) => {this.setRanges(json)},
            () => {}
        )
    }

    _onOk(value) {
        let _value = convertToString(value);

        var result = {
            alias: this.props.options.alias,
            value: _value,
            changed: this.props.value !== _value
        }

        this.props.onChange([result]);
    }

    _handleClick(value, dateString) {
        this.setState({
            value: value,
            clicked: true
        })
    }

    componentWillMount() {
        let value = this.props.value === null ? "": this.props.value
        this.setState({value: parseValue(value)})
        this.getRanges(this.props.options.url)
    }

    render() {
        let props = {...this.props.options.options};

        props.onOk = this._onOk.bind(this);
        props.onChange = this._handleClick.bind(this);

        if (this.props.value !== null) {
            props.value = parseValue(this.props.value)
        } else if (this.state.value.length > 1 & this.props.value === null){
            props.value = this.state.value
        }
        if (this.state.clicked) {
            props.value = this.state.value
        }

        props.ranges = parseRanges(this.state.ranges)

        return (
            <RangePicker showTime {...props}/>
        );
    }
}

export { AntDatePicker }
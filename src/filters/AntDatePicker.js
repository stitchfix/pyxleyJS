import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { fetchData } from '../utils/fetch'

const { RangePicker, MonthPicker } = DatePicker;

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
        if("url" in this.props.options){
            this.getRanges(this.props.options.url)
        }
    }

    render() {
        let props = {...this.props.options.options};

        props.onOk = this._onOk.bind(this);
        props.onChange = this._onOk.bind(this);
        // props.onChange = this._handleClick.bind(this);

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
            <div className="pyxley-range-picker">
            <RangePicker showTime {...props}/>
            </div>
        );
    }
}

class AntMonthRangePicker extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: [],
            start_date: moment(),
            end_date: moment()
        }
    }

    _handleClickStart(value) {

        let end_date = this.state.end_date
        let valarr = [value, end_date]
        if( value > end_date){
            valarr[1] = value
        }
        this.setState({
            start_date: valarr[0],
            end_date: valarr[1]
        })

        let _value = convertToString(valarr);

        var result = {
            alias: this.props.options.alias,
            value: _value,
            changed: this.props.value !== _value
        }
        this.props.onChange([result]);
    }

    _handleClickEnd(value) {
        let start_date = this.state.start_date
        let valarr = [start_date, value]
        if( value < start_date){
            valarr[0] = value
        }
        this.setState({
            end_date: valarr[1],
            start_date: valarr[0]
        })

        let _value = convertToString(valarr);

        var result = {
            alias: this.props.options.alias,
            value: _value,
            changed: this.props.value !== _value
        }
        this.props.onChange([result]);
    }

    render() {
        let propsStart = {...this.props.options.options}
        let propsEnd = {...this.props.options.options}

        // event handlers
        propsStart.onChange = this._handleClickStart.bind(this)
        propsEnd.onChange = this._handleClickEnd.bind(this)


        return (
            <div className={"pyxley-month-range"}>
            <MonthPicker {...propsStart} />
            <p> to </p>
            <MonthPicker {...propsEnd} />
            </div>
        );
    }
}

class AntDateSelect extends React.Component {
    constructor(props) {
        super(props)
    }

    _onOk(value) {
        let _value = value.format("YYYY-MM-DD")

        var result = {
            alias: this.props.options.alias,
            value: _value,
            changed: this.props.value !== _value
        }

        this.props.onChange([result]);
    }

    render () {
        let props = {
            className: "pyxley-date-select",
            onChange: this._onOk.bind(this)
        }
        if ( "value" in this.props ) {
            if( this.props.value !== null ){
                props.value = moment(this.props.value, "YYYY-MM-DD")
            }
        }
        if( "extraProps" in this.props.options ){
            for(let key in this.props.options.extraProps ){
                props[key] = this.props.options.extraProps[key]
            }
        }
        return (
            <DatePicker {...props}/>
        );
    }
}


export { AntDatePicker, AntMonthRangePicker, AntDateSelect }

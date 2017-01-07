import React from 'react';
import Select from 'react-select';

import 'react-select/dist/react-select.min.css';

// Wrapper for ReactSelect
//
//
//
//
//
class ReactSelect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options: [],
            value: null
        }
    }

    _fetch(params) {
        let url = this.props.options.url.concat("?", $.param(params));
        $.get(url, function(result){
            this.setState({
                options: result.data
            })
        }.bind(this));
    }

    componentWillMount() {
        this._fetch({});
    }

    update(params) {
        this._fetch(params);
    }

    getCurrentState() {
        var result = {};
        let outstring = this.state.value ? this.state.value : this.props.options.default;
        result[this.props.options.alias] = outstring;
        return result;
    }

    handleSelectChange (value) {
		this.setState({ value });
        var result = {
            alias: this.props.options.alias,
            value: value
        };
        this.props.onChange([result]);
	}

    render() {

        let props = this.props.options.options;
        props.value = this.state.value;
        props.onChange = this.handleSelectChange.bind(this);
        props.options = this.state.options;

        return (
            <Select { ...props }/>
        );
    }

}

ReactSelect.defaultProps = {
    options: {
        autosize: true,
        style: {width: '200px', float: 'left'},
        joinValues: true,
        delimiter: '|',
        simpleValue: true
    }
};
export {ReactSelect};

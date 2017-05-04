import React from 'react';
import Select from 'react-select';

import 'react-select/dist/react-select.min.css';

// Wrapper for ReactSelect
class ReactSelect extends React.Component {
    constructor(props){
        super(props);
    }

    handleSelectChange (value) {

        var result = {
            alias: this.props.options.alias,
            value: value,
            changed: this.props.value !== value
        };
        this.props.onChange([result]);
	}

    render() {
        let props = this.props.options.options;
        props.value = this.props.value;
        props.onChange = this.handleSelectChange.bind(this);
        props.options = this.props.items;

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
        simpleValue: false
    }
};

export {ReactSelect};

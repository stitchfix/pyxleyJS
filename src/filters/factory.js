import React from 'react';
import {SelectButton} from './SelectButton';
// import ConditionalSelectButton from './buttonFilters';
// import ApiButton from './buttonFilters';
// import DownloadButton from './buttonFilters';
// import SliderInput from './slider';
// import DynamicSearch from './dynamicSearch';
// import CheckboxGroup from './checkbox';

var FilterFactory = function(type) {
    if (typeof FilterFactory[type] != 'function'){
        throw new Error(type + ' is not a valid filter.');
    }

    return FilterFactory[type];
};

// FilterFactory.SliderInput = SliderInput;
FilterFactory.SelectButton = SelectButton;
// FilterFactory.ConditionalSelectButton = ConditionalSelectButton;
// FilterFactory.ApiButton = ApiButton;
// FilterFactory.DownloadButton = DownloadButton;
// FilterFactory.DynamicSearch = DynamicSearch;
// FilterFactory.CheckboxGroup = CheckboxGroup;

export class Filter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var Z = FilterFactory(this.props.type);
        return (
            <Z
                ref={"filter"}
                dynamic={this.props.dynamic}
                onChange={this.props.onChange}
                options={this.props.options} />
        );
    }
}

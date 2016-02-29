import React from 'react';
import {SelectButton} from './SelectButton';
import {ConditionalSelectButton} from './ConditionalSelectButton';
import {ApiButton} from './ApiButton';
import {DownloadButton} from './DownloadButton';
import {SliderInput} from './SliderInput';
import {DynamicSearchInput} from './DynamicSearchInput';
import {CheckboxGroup} from './CheckboxGroup';

var FilterFactory = function(type) {
    if (typeof FilterFactory[type] != 'function'){
        throw new Error(type + ' is not a valid filter.');
    }

    return FilterFactory[type];
};

FilterFactory.SliderInput = SliderInput;
FilterFactory.SelectButton = SelectButton;
FilterFactory.ConditionalSelectButton = ConditionalSelectButton;
FilterFactory.ApiButton = ApiButton;
FilterFactory.DownloadButton = DownloadButton;
FilterFactory.DynamicSearch = DynamicSearchInput;
FilterFactory.CheckboxGroup = CheckboxGroup;

export class Filter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var Z = FilterFactory(this.props.type);
        return (
            <Z
                ref={"filter"}
                id={this.props.id}
                dynamic={this.props.dynamic}
                onChange={this.props.onChange}
                options={this.props.options} />
        );
    }
}

export {FilterFactory};

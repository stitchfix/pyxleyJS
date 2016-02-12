import React from 'react';
import BaseFilter from './BaseFilter';
import {SelectButton} from './SelectButton';
import {DropdownButton, MenuItem} from 'react-bootstrap';

export class ConditionalSelectButton extends BaseFilter {
    constructor(props){
        super(props);
    }

    _handleClick(index, text, e) {
        e.preventDefault();
        this.setState({
            selected: index,
            value: text
        });

        if(this.props.dynamic){
            var result = [
                {
                    alias: this.props.options.aliases[0],
                    value: text
                },
                {
                    alias: this.props.options.aliases[1],
                    value: "All"
                }
            ];
            this.props.onChange(result);
        }
        this.refs.secondary.setState({value: "All"});
    }

    getCurrentState() {
        var result = {};
        result[this.props.options.aliases[0]] = this.state.value
            || this.props.options.defaults[0];
        result[this.props.options.aliases[1]] = this.refs.secondary.state.value
            || this.props.options.defaults[1];
        return result;
    }

    render() {
        var primary = this.props.options.items.map(function(item, idx){
            return (
                <MenuItem
                    key={idx}
                    onSelect={this._handleClick.bind(this, idx, item.primary)}>
                    {item.primary}
                </MenuItem>
            );
        }.bind(this));

        var label = this.state.value || this.props.options.labels[0];
        var secondary = {
            items: this.props.options.items[this.state.selected].secondary,
            label: this.props.options.labels[1],
            alias: this.props.options.aliases[1],
            default: this.props.options.defaults[1]
        };
        return (
            <div className={this.props.options.filter_style}>
            <DropdownButton
                id={this.props.id}
                ref="primary"
                title={label}>
                {primary}
            </DropdownButton>
            <SelectButton ref="secondary"
                onChange={this.props.onChange}
                dynamic={this.props.dynamic}
                options={secondary}  />
            </div>
        );
    }
}

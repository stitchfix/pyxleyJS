import React from 'react';
import BaseFilter from './BaseFilter';
import {DropdownButton, MenuItem} from 'react-bootstrap';

export class SelectButton extends BaseFilter {
    constructor(props) {
        super(props);
    }

    _handleClick(index, text, e)  {
        e.preventDefault();
        this.setState({
            selected: index,
            value: text
        });

        if(this.props.dynamic){
            var result = {
                alias: this.props.options.alias,
                value: text
            };
            this.props.onChange([result]);
        }
    }

    render() {
        var items = this.props.options.items.map(function(item, index){
            return (
                <MenuItem
                    key={index}
                    onSelect={this._handleClick.bind(this, index, item)}>
                    {item}
                </MenuItem>
            );

        }.bind(this));
        var label = this.state.value || this.props.options.label;
        return (
            <DropdownButton
                ref={"btn"}
                id={this.props.id}
                title={label}>
                {items}
            </DropdownButton>
        );
    }
}

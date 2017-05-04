import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

export class SelectButton extends React.Component {
    constructor(props) {
        super(props);
    }

    _handleClick(index, text)  {

        var result = {
            alias: this.props.options.alias,
            value: text,
            changed: this.props.value !== text
        };
        this.props.onChange([result]);
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

        var label = this.props.value || this.props.options.label;
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

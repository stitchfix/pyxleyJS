import React from 'react';
import {Input, Button} from 'react-bootstrap';

export class CheckboxGroup extends React.Component {
    constructor(props) {
        super(props);

    }

    getCurrentState() {
        var result = {};
        for(var i = 0; i < this.props.options.labels.length; i++){
            result[this.props.options.aliases[i]] =
                this.refs["checkbox_".concat(i)].getChecked();
        }
        return result;
    }

    _resetChecked() {
        for(var i = 0; i < this.props.options.labels.length; i++){
            this.refs["checkbox_".concat(i)].getInputDOMNode().checked = false;
        }
    }

    render() {
        var labels = this.props.options.labels.map(function(item, index){
            return (
                <Input
                    ref={"checkbox_".concat(index)}
                    type="checkbox" label={item}/>
            );
        });
        return (
            <div className="inputgrp">
            <div className="btn-group horizontal">
                <Button onClick={this.props.onChange.bind(this)}>Submit</Button>
                <Button onClick={this._resetChecked.bind(this)}>Reset</Button>
            </div>
            {labels}
            </div>
            );
    }

}

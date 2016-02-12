import React from 'react';
import BaseFilter from './BaseFilter';

export class SliderInput extends BaseFilter {
    constructor(props) {
        super(props);
    }

    _handleChange(e) {
        e.preventDefault();
        var slider = this.getDOMNode();
        this.setState({value: slider.value});

        if(this.props.dynamic){
            var result = {
                alias: this.props.options.alias,
                value: slider.value
            };
            this.props.onChange([result]);

        }
    }

    render() {

        return (
            <input id="pyx-slider"
                className="pyx-slider"
                ref="slider"
                type="range"
                name={this.props.options.label}
                min={this.props.options.min}
                max={this.props.options.max}
                onInput={this._handleChange.bind(this)}
                step={this.props.options.step} />
        );

    }

}

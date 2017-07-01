import React from 'react';
import { Checkbox } from 'antd';

class AntCheck extends React.Component {
    constructor(props){
        super(props);
    }

    _handleChange(e) {

        var result = {
            alias: this.props.options.alias,
            value: e.target.checked,
            changed: false
        };
        this.props.onChange([result]);
    }

    render() {
        return (
            <Checkbox onChange={this._handleChange.bind(this)}>
                {this.props.options.label}
            </Checkbox>
        );
    }
}

export {AntCheck};

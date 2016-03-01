import React from 'react';
import BaseFilter from './BaseFilter';
import {SelectButton} from './SelectButton';

export class ApiButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    getCurrentState() {
        return this.refs.apiBtn.getCurrentState();
    }

    componentDidMount() {
        this._fetchAPIData({});
    }

    _fetchAPIData(params) {
        $.get(this.props.options.url.concat('?', $.param(params)),
            function(result){
                this.setState({items: result.data});
            }.bind(this)
        );
    }

    update(params) {
        this._fetchAPIData(params);
    }

    render() {
        var opts = {
            items: this.state.items,
            alias: this.props.options.alias,
            default: this.props.options.default,
            label: this.props.options.label
        };
        return (
            <SelectButton ref="apiBtn"
                onChange={this.props.onChange}
                dynamic={this.props.dynamic}
                options={opts}/>
        );
    }
}

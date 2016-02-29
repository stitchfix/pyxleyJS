import React from 'react';
import {Button} from 'react-bootstrap';
import BaseFilter from './BaseFilter';

export class DownloadButton extends BaseFilter {
    constructor(props) {
        super(props);
    }

    _onClick() {
        var params = this.props.onChange();
        var url = this.props.options.url.concat("?", $.param(params));
        window.location.href = url;
    }

    render() {
        return (
            <Button onClick={this._onClick.bind(this)}>{this.props.options.label}</Button>
        );
    }
}

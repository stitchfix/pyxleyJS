import React from 'react';
import { Button } from 'antd';
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
        let props = {
            onClick: this._onClick.bind(this),
            icon: "download",
            id: this.props.id
        }
        return (
            <Button { ...props }>
                {this.props.options.label}
            </Button>
        );
    }
}

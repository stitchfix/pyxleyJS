import 'datatables/media/css/jquery.dataTables.min.css';
require("datatables");
import React from 'react';
$["dataTable"] = require("datatables");

export class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: []
        };
    }

    componentWillMount() {
        this._initialize();
    }

    _initialize() {
        var _url = this.props.options.url.concat("?",
            $.param(this.props.options.params));
        $.get(_url,
            function(result){
                this.setState({columns: result.columns});
                var options = this.props.options.table_options;
                options.data = result.data;
                options.columns = result.columns;
                options.aaData = result.data;
                if("columnDefs" in this.props.options.table_options){
                    options.columnDefs = this.props.options.table_options.columnDefs;
                    options.columnDefs.forEach(function(x){
                        x.render = new Function("return '" + x.render + "';");
                    });
                }

                options.initComplete = new Function("settings", "json",
                    this.props.options.table_options.initComplete);
                options.drawCallback = new Function("settings",
                    this.props.options.table_options.drawCallback);
                $('#'.concat(this.props.options.id)).dataTable(options);
            }.bind(this)
        );
    }

    _update(params) {
        var _table = $('#'.concat(this.props.options.id)).dataTable();
        _table.api().ajax.url(
            this.props.options.url.concat("?",$.param(params))
        ).load();

    }

    render() {
        var header = this.state.columns.map(function(item, index) {
            return (
                <th key={index}>{item.data}</th>
            );
        });
        return (
            <div>
                <table id={this.props.options.id}
                    className={this.props.options.className}
                    cellPadding="0"
                    cellSpacing="0" width="100%">
                <thead><tr>{header}</tr></thead>
                </table>
            </div>
        );
    }
}

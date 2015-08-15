

var Table = React.createClass({
    getDefaultProps: function() {
        return {
            options: {
                table_options: {
                    deferRender: true,
                    paging: false,
                    scrollX: true,
                    bSort: false,
                },
                id: "mytable",
                url: "",
                params: {}
            }
        };
    },
    getInitialState: function() {
        return {
            columns: []
        };
    },
    componentDidMount: function() {
        this._initialize();
    },
    _initialize: function() {

        $.get(this.props.options.url.concat("?",$.param(this.props.options.params)),
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

    },
    _update: function(params) {
        var _table = $('#'.concat(this.props.options.id)).dataTable();
        _table.api().ajax.url(this.props.options.url.concat("?",$.param(params))).load();

    },
    render: function() {
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
});

module.exports.Table = Table;
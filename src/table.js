

var Table = React.createClass({
    getDefaultProps: function() {
        return {
            options: {
                leftFixed: 0,
                rightFixed: 0,
                table_options: {
                    deferRender: true,
                    paging: false,
                    scrollX: true,
                    bSort: false,
                    "sDom": '<"top">rt<"bottom"lp><"clear">'
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

        $.get(this.props.options.url.concat("?",$.param(this.props.options.params)), function(result){
            this.setState({columns: result.columns});
            var options = this.props.options.table_options;
            options.data = result.data;
            options.columns = result.columns;
            options.aaData = result.data;
            var table = $('#'.concat(this.props.options.id)).dataTable(options);
            if( (this.props.options.leftFixed + this.props.options.rightFixed) > 0 ){
                new $.fn.dataTable.FixedColumns( table, {
                    leftColumns: this.props.options.leftFixed,
                    rightColumns: this.props.options.rightFixed
                });
            };
        }.bind(this));
    },
    _update: function(params) {
        var _table = $('#'.concat(this.props.options.id)).DataTable();
        _table.ajax.url(this.props.options.url.concat("?",$.param(params))).load();
    },
    render: function() {
        var header = this.state.columns.map(function(item, index) {
            return (
                <th key={index}>{item.data}</th>
            );
        });
        return (
            <div>
                <table id={this.props.options.id} className="display" cellSpacing="0" width="100%">
                <thead><tr>{header}</tr></thead>
                </table>
            </div>
        );
    }
});

module.exports.Table = Table;
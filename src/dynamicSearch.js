
var Input = ReactBootstrap.Input;
var DropdownMenu = ReactBootstrap.DropdownMenu;
var DropdownStateMixin = ReactBootstrap.DropdownStateMixin;
var BootstrapMixin = ReactBootstrap.BootstrapMixin;
var MenuItem = ReactBootstrap.MenuItem;
var classNames = require('classnames');
/** Modeled after
    realpython.com/blog/python/the-ultimate-flask-front-end-part-2
    and the DropdownButton in React-Bootstrap
**/

const DynamicSearch = React.createClass({
    mixins: [DropdownStateMixin, BootstrapMixin],

    getDefaultProps: function() {
        return {
            options: React.PropTypes.object,
            dynamic: false,
            onChange: React.PropTypes.func
        };
    },
    getInitialState: function() {
        return {
            value: null,
            searchString: "",
            items: []
        };
    },
    getCurrentState: function() {
        var result = {};
        result[this.props.options.alias] = this.state.value || this.props.options.default;
        return result;
    },
    componentDidMount: function() {
        this._fetchAPIData();
    },
    update: function(params){
        $.get(this.props.options.url.concat("?", $.param(params)),
            function(result){
                this.setState({items: result.data});
        }.bind(this));
    },
    _fetchAPIData: function(){
        $.get(this.props.options.url, function(result){
            this.setState({items: result.data});
        }.bind(this));
    },
    _filterItems: function() {
        var items = this.state.items;
        var searchString = this.state.searchString.trim().toLowerCase();
        if(searchString.length > 0){
            items = items.filter(function(x){
                return x.toLowerCase().match(searchString)
            });
        }
        var nresults = items.length;
        var results_left = "Results Left: #";
        return items.map(function(item, index){
            if(index < this.props.options.max){
                return (
                    <MenuItem
                        key={index}
                        onSelect={this._handleItemSelect.bind(null, item)}>
                        {item}
                    </MenuItem>

                );
            } else if (index == this.props.options.max){
                return (
                    <MenuItem key={index}>{results_left.replace("#", (nresults-index))}</MenuItem>
                );
            }
        }.bind(this));

    },
    _handleChange: function(e) {
        e.preventDefault();
        this.setState({
            searchString: e.target.value,
            value: e.target.value
        });
        this.setDropdownState(true);
    },
    _handleItemSelect: function(text, e){
        this.setState({ value: text });
        this.setDropdownState(!this.state.open);

        if(this.props.dynamic){
            var result = {
                alias: this.props.options.alias,
                value: text
            };
            this.props.onChange([result]);
        }

    },
    render: function() {

        var classes = {
            'dropdown': true,
            'open': this.state.open
        };
        return (
            <div className={classNames(classes)}>
            <Input
                type="text"
                ref="input"
                value={this.state.value}
                placeholder={this.props.options.placeholder}
                help={this.props.options.help}
                onChange={this._handleChange}/>
            <DropdownMenu
                ref="menu"
                key={1}
                aria-labelledby={this.props.id}
                pullRight={false}>
                {this._filterItems()}
                </DropdownMenu>
            </div>
        );
    }
});




module.exports.DynamicSearch = DynamicSearch;

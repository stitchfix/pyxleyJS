var DropdownButton = ReactBootstrap.DropdownButton;
var Button = ReactBootstrap.Button;

const SelectButton = React.createClass({
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
            selected: 0
        };
    },
    getCurrentState: function() {
        var result = {};
        result[this.props.options.alias] = this.state.value || this.props.options.default;
        return result;
    },
    _handleClick: function(index, text, e) {
        e.preventDefault();
        this.setState({
            selected: index,
            value: text
        });
        this.refs.btn.setDropdownState(false);
        if(this.props.dynamic){
            var result = {
                alias: this.props.options.alias,
                value: text
            };
            this.props.onChange([result]);
        }
    },
    render: function() {
        var items = this.props.options.items.map(function(item, index){
            return(
                <li onClick={this._handleClick.bind(null, index, item)} key={index}><a href='#'>{item}</a></li>
            );
        }.bind(this));
        var label = this.state.value || this.props.options.label;

        return (
            <DropdownButton ref="btn" title={label}>{items}</DropdownButton>
        );
    }
});

const ConditionalSelectButton = React.createClass({
    //
    //
    //
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
            selected: 0
        };
    },
    _handleClick: function(index, text, e) {
        e.preventDefault();
        this.setState({
            selected: index,
            value: text
        });
        this.refs.primary.setDropdownState(false);
        if(this.props.dynamic){
            var result = [
                {
                    alias: this.props.options.aliases[0],
                    value: text
                },
                {
                    alias: this.props.options.aliases[1],
                    value: "All"
                }
            ];
            this.props.onChange(result);
        }
        this.refs.secondary.setState({value: "All"});

    },
    getCurrentState: function() {
        var result = {};
        result[this.props.options.aliases[0]] = this.state.value || this.props.options.defaults[0];
        result[this.props.options.aliases[1]] = this.refs.secondary.state.value || this.props.options.defaults[1];
        return result;
    },
    render: function() {
        var primary = this.props.options.items.map(function(item, index){
            return(
                <li onClick={this._handleClick.bind(null, index, item.primary)} key={index}><a href='#'>{item.primary}</a></li>
            );
        }.bind(this));

        var label = this.state.value || this.props.options.labels[0];
        var secondary = {
            items: this.props.options.items[this.state.selected].secondary,
            label: this.props.options.labels[1],
            alias: this.props.options.aliases[1],
            default: this.props.options.defaults[1]
        };
        return (
            <div className={this.props.options.filter_style}>
            <DropdownButton ref="primary" title={label}>{primary}</DropdownButton>
            <SelectButton ref="secondary"
                onChange={this.props.onChange}
                dynamic={this.props.dynamic}
                options={secondary}  />
            </div>
        );
    }
});

var ApiButton = React.createClass({
    getDefaultProps: function() {
        return {
            options: React.PropTypes.object,
            dynamic: false,
            onChange: React.PropTypes.func
        };
    },
    getInitialState: function() {
        return {
            items: []
        };
    },
    getCurrentState: function() {
        return this.refs.apiBtn.getCurrentState();
    },
    componentDidMount: function() {
        this._fetchAPIData();
    },
    _fetchAPIData: function(){
        $.get(this.props.options.url, function(result){
            this.setState({items: result.data});
        }.bind(this));
    },
    update: function(params){
        $.get(this.props.options.url.concat("?", $.param(params)),
            function(result){
                this.setState({items: result.data});
        }.bind(this));
    },
    render: function() {
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
});

const DownloadButton = React.createClass({
    getDefaultProps: function(){
        return {
            options: React.PropTypes.object,
            dynamic: false,
            onChange: React.PropTypes.func
        };
    },
    getCurrentState: function(){
        return null;
    },
    _onClick: function(){
        var params = this.props.onChange();
        window.location.href = this.props.options.url.concat("?", $.param(params));
    },
    render: function(){

        return (
                <Button onClick={this._onClick}>{this.props.options.label}</Button>
            );
    }
});

module.exports.ConditionalSelectButton = ConditionalSelectButton;
module.exports.SelectButton = SelectButton;
module.exports.ApiButton = ApiButton;
module.exports.DownloadButton = DownloadButton;
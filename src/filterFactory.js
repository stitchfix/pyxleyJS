
var SelectButton = require('./buttonFilters').SelectButton;
var DownloadButton = require('./buttonFilters').DownloadButton;
var ConditionalSelectButton = require('./buttonFilters').ConditionalSelectButton;
var ApiButton = require('./buttonFilters').ApiButton;
var SliderInput = require('./slider').SliderInput;
var DynamicSearch = require('./dynamicSearch').DynamicSearch;
var CheckboxGroup = require('./checkbox').CheckboxGroup;

var FilterFactory = function(type) {

    if (typeof FilterFactory[type] != 'function'){
        throw new Error(type + ' is not a valid filter.');
    }

    return FilterFactory[type];
};

FilterFactory.SliderInput = SliderInput;
FilterFactory.SelectButton = SelectButton;
FilterFactory.ConditionalSelectButton = ConditionalSelectButton;
FilterFactory.ApiButton = ApiButton;
FilterFactory.DownloadButton = DownloadButton;
FilterFactory.DynamicSearch = DynamicSearch;
FilterFactory.CheckboxGroup = CheckboxGroup;

const Filter = React.createClass({
    getDefaultProps: function() {
        return {
            type: React.PropTypes.string.isRequired,
            options: React.PropTypes.object,
            dynamic: false,
            onChange: React.PropTypes.func
        };
    },
    render: function(){
        var Z = FilterFactory(this.props.type);
        return (
            <Z ref={"filter"}
                dynamic={this.props.dynamic}
                onChange={this.props.onChange}
                options={this.props.options} />
        );
    }
});


module.exports.Filter = Filter;

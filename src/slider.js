
const SliderInput = React.createClass({
    getDefaultProps: function() {
        return {
            options: React.PropTypes.object,
            dynamic: false,
            onChange: React.PropTypes.func
        };
    },
    getInitialState: function() {
        return {
            value: null
        };
    },
    getCurrentState: function() {
        var result = {};
        result[this.props.options.alias] = this.state.value || this.props.options.default;
        return result;
    },
    _handleChange: function(e) {
        e.preventDefault();
        var slider = this.getDOMNode();
        this.setState({value: slider.value});

        if(this.props.dynamic){
            var result = {
                alias: this.props.options.alias,
                value: slider.value
            };
            this.props.onChange([result]);
        }
    },
    render: function() {

        return (
            <input id="pyx-slider"
                className="pyx-slider"
                ref="slider"
                type="range"
                name={this.props.options.label}
                min={this.props.options.min}
                max={this.props.options.max}
                onInput={this._handleChange}
                step={this.props.options.step} />
        );
    }
});

module.exports.SliderInput = SliderInput;
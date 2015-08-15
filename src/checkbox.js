
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;

const CheckboxGroup = React.createClass({
    getDefaultProps: function() {
        return {
            options: React.PropTypes.object,
            dynamic: false,
            onChange: React.PropTypes.func
        };
    },
    getCurrentState: function() {
        var result = {};
        for(var i = 0; i < this.props.options.labels.length; i++){
            result[this.props.options.aliases[i]] =
                this.refs["checkbox_".concat(i)].getChecked();
        }
        return result;
    },
    _resetChecked: function(){
        for(var i = 0; i < this.props.options.labels.length; i++){
            this.refs["checkbox_".concat(i)].getInputDOMNode().checked = false;
        }
    },
    render: function() {
        var labels = this.props.options.labels.map(function(item, index){
            return (
                <Input ref={"checkbox_".concat(index)} type="checkbox" label={item}/>
            );
        });
        return (
            <div className="inputgrp">
            <div className="btn-group horizontal">
            <Button onClick={this.props.onChange}>Submit</Button>
            <Button onClick={this._resetChecked}>Reset</Button>
            </div>
            {labels}
            </div>
            );
    }
});

module.exports.CheckboxGroup = CheckboxGroup;
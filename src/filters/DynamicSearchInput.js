import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Dropdown, MenuItem} from 'react-bootstrap';
import classNames from 'classnames';

class InputMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.onChange = e => this.setState({
            value: e.target.value
        });
    }

    filterChildren() {
      let { children } = this.props;
      let filtered = [];
      React.Children.forEach(children, child => {
          filtered.push(child);
      });

      return filtered;
    }
    
    render() {

        return (


            <ul className={"dropdown-menu"}>
                { this.filterChildren() }
            </ul>

        );
    }
}

export class DynamicSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            searchString: "",
            items: []
        };
    }

    getCurrentState() {
        var result = {};
        result[this.props.options.alias] = this.state.value ||
            this.props.options.default;
        return result;
    }

    _fetchAPIData(params) {
        var url = this.props.options.url.concat("?", $.param(params));
        $.get(url, function(result){
            this.setState({items: result.data});
        }.bind(this));
    }

    update(params) {
        this._fetchAPIData(params);
    }

    componentDidMount() {
        this._fetchAPIData({});
    }

    _handleItemSelect(text, e) {
        this.setState({ value: text });
        this.dd.refs.inner.toggleOpen(false);
        if(this.props.dynamic){
            var result = {
                alias: this.props.options.alias,
                value: text
            };
            this.props.onChange([result]);
        }

    }

    _filterItems() {
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
                        onSelect={this._handleItemSelect.bind(this, item)}>
                        {item}
                    </MenuItem>

                );
            } else if (index == this.props.options.max){
                return (
                    <MenuItem key={index}>
                        {results_left.replace("#", (nresults-index))}
                    </MenuItem>
                );
            }
        }.bind(this));
    }

    _handleChange(e) {
        e.preventDefault();
        this.setState({
            searchString: e.target.value,
            value: e.target.value
        });
    }

    render() {
        return (
            <Dropdown id="dropdown-custom-menu"
                ref={dd => this.dd = dd}>

            <Input
                bsRole="toggle"
                type="text"
                ref="input"
                value={this.state.value}
                placeholder={this.props.options.placeholder}
                help={this.props.options.help}
                onChange={this._handleChange.bind(this)}/>
                <InputMenu
                    placeholder={this.props.options.placeholder}
                    bsRole="menu">
                    {this._filterItems()}
                </InputMenu>
            </Dropdown>
        );
    }
}

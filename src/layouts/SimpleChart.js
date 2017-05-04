import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import {Filter} from '../filters/factory';
import {Chart} from '../charts/factory';
import {actions} from '../actions/index';
import {utils} from './utils';
import {fetchData} from '../utils/fetch';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const getChartData = utils.getChartData
const getFilterData = utils.getFilterData
const updateFilterState = utils.updateFilterState

class SimpleChart extends React.Component {
    constructor(props) {
        super(props);

    }

    _gatherParams(input) {
        var params = {};

        let _state = this.context.store.getState()
        for(let key in _state.filters) {
            params[key] = _state.filters[key].value
        }

        if(input){
            for(var i = 0; i < input.length; i++){
                params[input[i].alias] = input[i].value;
            }
        }
        return params;
    }

    _getChartData(params) {
        let {dispatch} = this.props;
        getChartData(params, dispatch, this.props.charts)

    }

    _getFilterData(params) {
        let {dispatch} = this.props;
        getFilterData(params, dispatch, this.props.filters)
    }


    _updateFilterState(input) {
        let {dispatch} = this.props;
        updateFilterState(input, dispatch)

    }

    _handleClick(input) {
        // update the charts
        var params = this._gatherParams(input);
        this._updateFilterState(input)
        this._getFilterData(params)
        this._getChartData(params)

    }

    componentDidMount(){
        this._getFilterData({})
        this._getChartData({})
    }

    get_filters(prop_filters, group_name) {
        let filters = [];
        if (prop_filters.length > 0) {
            filters = prop_filters.map(function(x, index){
                return (
                    <div
                        key={'div_filter_'.concat(index)}
                        className={group_name}>
                    {x.label ? <h2>{x.label}</h2> : null}
                    <Filter
                        ref={'filter_'.concat(index)}
                        id={'filter_'.concat(index)}
                        onChange={this._handleClick.bind(this)}
                        type={x.type}
                        options={x.options}/>
                    <br/>
                    </div>
                );
            }.bind(this));
        }
        return filters;
    }

    get_charts(prop_charts) {
        let charts = [];
        if(prop_charts.length > 0){
            charts = prop_charts.map(function(x, index){
                return(
                    <Chart
                        ref={'chart_'.concat(index)}
                        id={"chart_".concat(index)}
                        key={"chart_".concat(index)}
                        type={x.type}
                        options={x.options}/>
                    );
            });
        }
        return charts;
    }

    render(){

        let filters = [];
        for( let _filter in this.props.filters) {
            filters.push(this.get_filters(
                this.props.filters[_filter], _filter
            ));
        }

        let charts = this.get_charts(this.props.charts);

        return (
            <Grid>

                <Col xs={6} md={2}>
                    {filters}
                </Col>

                <Col xs={12} md={10}>
                {charts}
                </Col>
            </Grid>
            );
    }

}
SimpleChart.contextTypes = {
  store: PropTypes.object.isRequired
};
SimpleChart = connect()(SimpleChart);
export {SimpleChart};

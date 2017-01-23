import React from 'react';
import {Row, Grid} from 'react-bootstrap';
import {Filter} from '../filters/factory';
import {Chart} from '../charts/factory';

class SimpleChart extends React.Component {
    constructor(props) {
        super(props);
    }

    _gatherParams(input) {
        var params = {};

        for(var i = 0; i < this.props.filters.length; i++){
            let fidx = 'filter_'.concat(i);
            let vals = this.refs[fidx].refs.filter.getCurrentState();

            for(var key in vals){
                params[key] = vals[key];
            }
        }
        if(input){
            for(var i = 0; i < input.length; i++){
                params[input[i].alias] = input[i].value;
            }
        }
        return params;
    }

    _handleClick(input) {
        // update the charts
        var params = this._gatherParams(input);
        for(var i = 0; i < this.props.charts.length; i++){
            this.refs['chart_'.concat(i)].update(params);
        }


        for(var i = 0; i < this.props.filters.length; i++){
            let fidx = 'filter_'.concat(i)
            if(typeof this.refs[fidx].refs.filter.update === 'function') {
                this.refs[fidx].refs.filter.update(params);
            }
        }
        return params;
    }

    get_filters(prop_filters, group_name) {
        let filters = [];
        if (prop_filters.length > 0) {
            filters = prop_filters.map(function(x, index){
                return (
                    <Filter
                        key={'filter_'.concat(index, '_', group_name)}
                        ref={'filter_'.concat(index)}
                        id={'filter_'.concat(index)}
                        onChange={this._handleClick.bind(this)}
                        type={x.type}
                        options={x.options}/>
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
            let _filters = this.get_filters(this.props.filters[_filter], _filter)
            filters.push(<div className={_filter}>{_filters}</div>);
        }

        let charts = this.get_charts(this.props.charts);

        return (

                <Grid>
                <Row>
                    {filters}
                </Row>

                <Row>
                    {charts}
                </Row>
                </Grid>

            );
    }

}


export {SimpleChart};

import React from 'react';

const makeMap = (result) => ({
    scope: 'usa',
    fills: result.fills,
    data: result.data,
    popupOnHover: true,
    geographyConfig: {
      highlightBorderColor: '#bada55',
      popupTemplate: function(geography) {
        return '<div class="hoverinfo">' + geography.properties.name
      },
      highlightBorderWidth: 3
    }
})

class Datamaps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.chart === null) {
            if( "data" in nextProps.data ){
                this._initialize(nextProps.data)
            }
        } else {
            this._update(nextProps.data)
        }
    }

    _initialize(data) {
        let mapObject = this.props.mapFunc(data)
        mapObject.element = document.getElementById(this.props.id)

        this.setState({
            chart: new Datamap(mapObject)
        })
    }


    _update(data){
        this.state.chart.updateChoropleth(data.data);
    }

    render() {
        return (
            <div
                id={this.props.id}
                className="pyDataMap">
            </div>
        );
    }

}

Datamaps.defaultProps = {
    mapFunc: makeMap
}
export {Datamaps};

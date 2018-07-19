
import {actions} from '../actions/index'
import {fetchData, postData} from '../utils/fetch'
const receiveChartData = actions.receiveChartData;
const receiveChartDataError = actions.receiveChartDataError;
const receiveFilterData = actions.receiveFilterData;
const receiveFilterDataError = actions.receiveFilterDataError;
const selectFilterOption = actions.selectFilterOption;
const removeFilterOption = actions.removeFilterOption;

function getChartData(rootPath, params, dispatch, charts, prefix) {

    for(var i = 0; i < charts.length; i++){

        let id = prefix.concat(i)
        fetchData(
            rootPath.concat(charts[i].options.url),
            params,
            json => {dispatch(receiveChartData(id,json))},
            () => {dispatch(receiveChartDataError())}
        )
    }
}

function getFilterData(rootPath, params, dispatch, filters) {

    for (let _filter in filters){

        filters[_filter].map( f => {

            if (("url" in f.options) && (f.options.alias !== undefined)){

                fetchData(
                    rootPath.concat(f.options.url),
                    params,
                    json => {
                        dispatch(
                            receiveFilterData(f.options.alias,json.data)
                        )
                    },
                    () => {dispatch(receiveFilterDataError())}
                )
            }
        })
    }
}


function updateLocation(alias, value){
    let url = document.location.hash;

    if(url.length > 1) {
        url = url.slice(1)
    }

    // split on ?
    let tokens = url.replace(" & ", " + ").split("&")

    let query = ""
    let notFound = true
    let prefix = ""
    for (let i = 0; i < tokens.length; i++){
        if( tokens[i] !== "" ){
            // split on =
            let pairs = tokens[i].split("=")
            if( pairs.length > 1){
                if(pairs[0] === alias){
                    tokens[i] = pairs[0].concat("=", value)
                    notFound = false
                }
                prefix = query === "" ? "" : "&"
                query = query.concat(prefix, tokens[i])
            }
        }

    }
    if( notFound ){
        prefix = query === "" ? "" : "&"
        query = query.concat(prefix, alias, "=", value)
    }

    document.location.hash = query;
}

function updateFilterState(input, dispatch) {

    if(input.constructor === Array){
        input.map( t => {
            dispatch(selectFilterOption(t.alias, t.value))
        })
    }

}

function removeFilters(input, dispatch) {
    if(input.constructor === Array){
        input.map( t => {
            dispatch(removeFilterOption(t.alias))
        })
    }
}

function updateStateAndHash(input, dispatch) {

    if(input.constructor === Array){
        input.map( t => {
            dispatch(selectFilterOption(t.alias, t.value))
            updateLocation(t.alias, t.value)
        })
    }

}

const utils = {
    getChartData: getChartData,
    getFilterData: getFilterData,
    removeFilters: removeFilters,
    updateFilterState: updateFilterState,
    updateStateAndHash: updateStateAndHash
}

export {utils}

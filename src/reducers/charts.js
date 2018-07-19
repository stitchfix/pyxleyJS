
const select_chart = (state = {}, action) => {

  switch (action.type) {
    case 'RECEIVE_PYXLEY_CHART':
      return {
        index: action.index,
        data: action.data
      }

    default:
      return state
  }
}

const removeKeyFromState = (state, removeKey ) => {
    let newState = {}
    for( let key in state ) {
        if( removeKey !== key ) {
            newState[key] = state[key]
        }
    }
    return newState
}

const filters = (state = {}, action) => {
    switch(action.type) {
        case 'SELECT_FILTER_OPTION':
            return {
                ...state,
                [action.index]: select_filter(state[action.index], action)
            }
        case 'REMOVE_FILTER_OPTION':
            return removeKeyFromState(state, action.index)
        default:
            return state
    }
}


const charts = (state = {}, action) => {
    switch(action.type) {
        case 'RECEIVE_PYXLEY_CHART':
            return {
                ...state,
                [action.index]: select_chart(state[action.index], action)
            }
        case 'REMOVE_PYXLEY_CHART':
            return removeKeyFromState(state, action.index)
        case 'CLEAR_ALL_CHARTS':
            return {}
        default:
            return state
    }
}

export {charts}

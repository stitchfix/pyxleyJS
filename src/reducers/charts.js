
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

const charts = (state = {}, action) => {
    switch(action.type) {
        case 'RECEIVE_PYXLEY_CHART':
            return {
                ...state,
                [action.index]: select_chart(state[action.index], action)
            }
        default:
            return state
    }
}

export {charts}

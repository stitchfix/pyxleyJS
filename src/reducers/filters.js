
const select_filter = (state = {}, action) => {

  switch (action.type) {
    case 'SELECT_FILTER_OPTION':
      return {
        index: action.index,
        value: action.value
      }

    default:
      return state
  }
}

const filters = (state = {}, action) => {
    switch(action.type) {
        case 'SELECT_FILTER_OPTION':
            return {
                ...state,
                [action.index]: select_filter(state[action.index], action)
            }
        default:
            return state
    }
}

const select_filter_options = (state = {}, action) => {

  switch (action.type) {
    case 'RECEIVE_PYXLEY_FILTER':
      return {
        index: action.index,
        data: action.data
      }

    default:
      return state
  }
}

const filter_data = (state = {}, action) => {
    switch(action.type) {
        case 'RECEIVE_PYXLEY_FILTER':
            return {
                ...state,
                [action.index]: select_filter_options(
                        state[action.index],
                        action
                    )
            }
        default:
            return state
    }
}

export {filters, filter_data}

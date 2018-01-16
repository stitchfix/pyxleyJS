
export const SELECT_FILTER_OPTION = 'SELECT_FILTER_OPTION'
export const selectFilterOption = (index, value) => (
  {
    type: SELECT_FILTER_OPTION,
    index,
    value
  }
)

export const REMOVE_FILTER_OPTION = 'REMOVE_FILTER_OPTION'
export const removeFilterOption = (index) => (
  {
    type: REMOVE_FILTER_OPTION,
    index
  }
)
export const receiveFilterData = (index, data) => ({
    type: 'RECEIVE_PYXLEY_FILTER',
    index,
    data
})

export const receiveFilterDataError = () => ({
    type: 'RECEIVE_PYXLEY_FILTER_ERROR'
})

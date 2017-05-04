
export const SELECT_FILTER_OPTION = 'SELECT_FILTER_OPTION'
export const selectFilterOption = (index, value) => (
  {
    type: SELECT_FILTER_OPTION,
    index,
    value
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

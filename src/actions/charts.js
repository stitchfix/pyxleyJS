
export const receiveChartData = (index, data) => ({
    type: 'RECEIVE_PYXLEY_CHART',
    index,
    data
})

export const receiveChartDataError = () => ({
    type: 'RECEIVE_PYXLEY_CHART_ERROR'
})


export const receiveLayouts = (layouts) => ({
    type: 'RECEIVE_PYXLEY_LAYOUT',
    layouts
})

export const receiveLayoutsError = () => ({
    type: 'RECEIVE_PYXLEY_LAYOUT_ERROR'
})

export const receiveNavBar = (navlinks, brand) => ({
    type: 'RECEIVE_NAV_BAR',
    navlinks,
    brand
})

export const receiveNavBarError = () => ({
    type: 'RECEIVE_PYXLEY_LAYOUT_ERROR'
})

export const clearAllCharts = () => ({
    type: 'CLEAR_ALL_CHARTS'
})

export const removePyxleyChart = (index) => ({
    type: 'REMOVE_PYXLEY_CHART',
    index: index
})
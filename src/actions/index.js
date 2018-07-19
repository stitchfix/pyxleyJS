
import {
    selectFilterOption,
    removeFilterOption,
    receiveFilterData,
    receiveFilterDataError
    } from './filters'
import {
    receiveChartData,
    receiveChartDataError,
    receiveLayouts,
    receiveLayoutsError,
    receiveNavBar,
    receiveNavBarError,
    clearAllCharts,
    removePyxleyChart
} from './charts'

export const actions = {
    selectFilterOption: selectFilterOption,
    removeFilterOption: removeFilterOption,
    receiveFilterData: receiveFilterData,
    receiveFilterDataError: receiveFilterDataError,
    receiveChartData: receiveChartData,
    receiveChartDataError: receiveChartDataError,
    receiveLayouts: receiveLayouts,
    receiveLayoutsError: receiveLayoutsError,
    receiveNavBar: receiveNavBar,
    receiveNavBarError: receiveNavBarError,
    clearAllCharts: clearAllCharts,
    removePyxleyChart: removePyxleyChart
}

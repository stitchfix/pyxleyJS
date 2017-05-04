
import {
    selectFilterOption,
    receiveFilterData,
    receiveFilterDataError
    } from './filters'
import {
    receiveChartData,
    receiveChartDataError,
    receiveLayouts,
    receiveLayoutsError,
    receiveNavBar,
    receiveNavBarError
} from './charts'

export const actions = {
    selectFilterOption: selectFilterOption,
    receiveFilterData: receiveFilterData,
    receiveFilterDataError: receiveFilterDataError,
    receiveChartData: receiveChartData,
    receiveChartDataError: receiveChartDataError,
    receiveLayouts: receiveLayouts,
    receiveLayoutsError: receiveLayoutsError,
    receiveNavBar: receiveNavBar,
    receiveNavBarError: receiveNavBarError
}

const layouts = (state = {}, action) => {
    switch (action.type) {
        case 'RECEIVE_PYXLEY_LAYOUT':
            return {
                ...state,
                layouts: action.layouts
            }
        default:
            return state
    }
}

const navBar = (state = {}, action) => {
    switch (action.type) {
        case 'RECEIVE_NAV_BAR':
            return {
                ...state,
                navlinks: action.navlinks,
                brand: action.brand
            }
        default:
            return state
    }
}


export {layouts, navBar}

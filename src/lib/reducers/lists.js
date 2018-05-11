import {hasAugmentLogout, hasAugmentLogin} from '../actions/apiDeclare'

let initialLists = {lists: {}}

const lists = (state = initialLists, action) => {
    if (action.meta && action.meta.loadListResponse) {
        let pair = action.meta.loadListResponse(action)
        let lists = Object.assign({}, state.lists)
        lists[pair.listName] = pair.list
        return Object.assign({}, state, {lists})
    }
    if (hasAugmentLogout(action) || hasAugmentLogin(action)) {
        return initialLists
    }
    if (action.meta && action.meta.resetLists) {
        return initialLists
    }
    return state
}

export default lists

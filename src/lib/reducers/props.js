import {hasAugmentLogout, hasAugmentLogin} from '../actions/rrAccessApi'

let initialProps = {}

const props = (state = initialProps, action) => {
    if (hasAugmentLogout(action) || hasAugmentLogin(action)) {
        return initialProps
    }
    if (action.meta && action.meta.saveStateKey) {
        let tmp = Object.assign({}, state)
        tmp[action.meta.saveStateKey] = action.meta.saveStateVal
        return Object.assign({}, state, tmp)
    }
    return state
}

export default props

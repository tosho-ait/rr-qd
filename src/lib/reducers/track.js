import {hasAugmentLogout, hasAugmentLogin} from "../actions/rrAccessApi"

const STALE_YES = 1
const STALE_LOAD = 2
const STALE_NOT = 3

let initialTrack = {track: {}, stale: {}, anyLoading: false, STALE_YES, STALE_LOAD, STALE_NOT}

let cleanUp = (track) => {
    let toReturn = {}
    let now = new Date().getTime()
    for (let call in track) {
        if (track[call].req && (now - track[call].req < 60000 * 60)) {
            toReturn[call] = track[call]
        }
    }
    return toReturn
}

let windUp = (action, state) => {
    if (action.meta && action.meta.trackReq) {
        //track request
        let track = {...state.track}
        track[action.meta.trackKey] = {
            req: new Date().getTime(),
            rsp: null,
            name: action.meta.trackReq
        }
        // set stale to STALE_LOAD
        let stale = {...state.stale}
        stale[action.meta.trackReq] = STALE_LOAD
        //check if any is loading
        let anyLoading = false
        for (var any in track) {
            if (!track[any].rsp) {
                anyLoading = true;
            }
        }
        track = cleanUp(track)
        return Object.assign({}, state, {track, stale, anyLoading})
    }
    return state
}

let release = (action, state) => {
    if (action.meta && action.meta.trackRsp) {
        //track request end
        let track = {...state.track}
        if (track[action.meta.trackKey]) {
            track[action.meta.trackKey].rsp = new Date().getTime()
        }
        // set stale to STALE_LOAD
        let stale = {...state.stale}
        stale[action.meta.trackRsp] = STALE_NOT
        //check if any is loading
        let anyLoading = false
        for (var any in track) {
            if (!track[any].rsp) {
                anyLoading = true
            }
        }
        return Object.assign({}, state, {track, stale, anyLoading})

    }
    return state
}

let staleUp = (action, state) => {
    if (action.meta && action.meta.trackStaleUp) {
        let stale = {...state.stale}
        if (action.meta.trackStaleUp.map) {
            action.meta.trackStaleUp.map(su => {
                stale[su] = STALE_YES
            })
        } else {
            stale[action.meta.trackStaleUp] = STALE_YES
        }
        return Object.assign({}, state, {stale})
    }
    return state
}

const track = (state = initialTrack, action) => {
    if (hasAugmentLogout(action) || hasAugmentLogin(action)) {
        return initialTrack
    }
    let toReturn = state
    toReturn = windUp(action, toReturn)
    toReturn = release(action, toReturn)
    toReturn = staleUp(action, toReturn)
    return toReturn
}

export default track

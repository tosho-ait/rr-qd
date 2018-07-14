import {CALL_API} from 'redux-api-middleware'

export const REQ = "_REQ"
export const RSP = "_RSP"
export const ERR = "_ERR"

export const GET = "GET"
export const POST = "POST"
export const DELETE = "DELETE"

export const logoutOn403 = true
export const logout = true

export const showMessage = true
export const showInfoMessage = true
export const showWarningMessage = true
export const showErrorMessage = true

export const hideMessage = true
export const hideInfoMessage = true
export const hideWarningMessage = true
export const hideErrorMessage = true

export const scrollTop = true

export const confirmRouteRelease = true
export const confirmRoutePrime = true

export const resetLists = true
export const resolveOnError = true
export const includeParameters = true

export const authPing = true
export const loginCall = true

// In Redux you identify your actions by the action.type field
// But when you use only the single action.type in an action it gets cumbersome to fire the same reducer code on
// multiple actions or also fire multiple reducers on a single action
// So Fancy is using "Augments" instead of action.type to do stuff on dispatched actions
// The augments can be multiple on a single action and are placed in action.meta
//
// Complete list of augments:
//
// Augments for the auth reducer
//  authPingResponse -
//  authPingError -
//  loginRequest -
//  loginError -
//  loginResponse -
//  logout -
//  logoutOn403 -
//
// Augments for the router reducer:
//  setPublic -
//  setPrivateProps -
//  clearPrivateProps -
//  confirmRouteRelease -
//  confirmRoutePrime -
//  logoutOn403 -
//  resolve -
//  reject -
//  showMessage -
//  showInfoMessage -
//  showWarningMessage -
//  hideMessage -
//  hideInfoMessage -
//  hideWarningMessage -
//  showErrorMessage -
//  hideErrorMessage -
//  scrollTop -
//
// Augments for the lists reducer:
//  loadListResponse -
//
// Augments for the loaders reducer:
//  trackRequest -
//
// Augments for the stale reducer:
//  trackStaleUp -
//
// Augments for the props reducer:
//  saveStateKey -
//  saveStateVal -

// Use this to define your backend calls
export let apiCall = ({name, endpoint, method, trackRequest, request, response, error, includeParameters, resolveOnError, headers, authPing, loginCall}) => {
    let action = (parameters) => {
        let jsonData, stringData, reject, resolve, data, id, actionRequest, actionResponse, actionError, formData
        if (parameters) {
            jsonData = parameters.jsonData
            stringData = parameters.stringData
            reject = parameters.reject
            resolve = parameters.resolve
            data = parameters.data
            id = parameters.id
            actionRequest = parameters.request
            actionResponse = parameters.response
            actionError = parameters.error
            formData = parameters.formData
            if (parameters.headers) {
                headers = parameters.headers
            }
            if (parameters.trackRequest) {
                trackRequest = parameters.trackRequest
            }
        }
        let types = [
            {type: name + endpoint + REQ, meta: {}},
            {type: name + endpoint + RSP, meta: {}},
            {type: name + endpoint + ERR, meta: {}}
        ]
        if (request) {
            types[0].meta = {...request}
        }
        if (response) {
            types[1].meta = {...response}
        }
        if (error) {
            types[2].meta = {...error}
        }
        if (actionRequest) {
            types[0].meta = {...types[0].meta, ...actionRequest}
        }
        if (actionResponse) {
            types[1].meta = {...types[1].meta, ...actionResponse}
        }
        if (actionError) {
            types[2].meta = {...types[2].meta, ...actionError}
        }
        if (includeParameters && parameters) {
            types[0].meta.parameters = parameters
            types[1].meta.parameters = parameters
            types[2].meta.parameters = parameters
        }
        if (trackRequest) {
            // keep status of the BE call in the loader reducer
            if (trackRequest === true) {
                // use name as default track key
                types[0].meta.trackReq = name
                types[1].meta.trackRsp = name
                types[2].meta.trackRsp = name
            } else {
                types[0].meta.trackReq = trackRequest
                types[1].meta.trackRsp = trackRequest
                types[2].meta.trackRsp = trackRequest
            }
            let key = Math.floor(Math.random() * 1000000)
            types[0].meta.trackKey = key
            types[1].meta.trackKey = key
            types[2].meta.trackKey = key
        }
        if (resolve) {
            types[1].meta.resolve = resolve
            if (resolveOnError) {
                types[2].meta.resolve = resolve
            }
        }
        if (loginCall && types[1].meta.loginResponse) {
            // we have a login request
            types[0].meta.loginRequest = true
            types[2].meta.loginError = true
        }
        if (authPing) {
            // the call is a ping to confirm authentication status
            types[0].meta.authPingRequet = true
            types[1].meta.authPingResponse = true
            types[2].meta.authPingError = true
        }
        if (reject && !resolveOnError) {
            types[2].meta.reject = reject
        }
        let toReturnCall = {
            endpoint,
            method: method,
            headers: (state) => {
                let toReturn = {}
                if (!headers || !headers.noJson) {
                    toReturn['Accept'] = 'application/json'
                    toReturn['Content-Type'] = 'application/json'
                }
                if (!headers || !headers.noToken) {
                    toReturn['Authorization'] = state.auth.token
                }
                if (headers && headers.token) {
                    toReturn['Authorization'] = headers.token
                }
                return toReturn
            },
            types
        }
        if (jsonData) {
            toReturnCall.body = JSON.stringify(jsonData)
        }
        if (data) {
            toReturnCall.body = JSON.stringify(data)
        }
        if (stringData) {
            toReturnCall.body = String(stringData)
        }
        if (id) {
            toReturnCall.body = String(id)
        }
        if (formData) {
            toReturnCall.body = formData
        }
        return {[CALL_API]: toReturnCall};
    }
    return {
        // endpoint for the api call
        endpoint,
        // name for the api call
        name,
        // type of the action fired on BE call start
        request: name + endpoint + REQ,
        // type of the action fired on BE call response
        response: name + endpoint + RSP,
        // type of the action fired on BE call error response
        error: name + endpoint + ERR,
        // the action creator itself, it produces a redux-api-middleware action
        action,
        // convenience function to register the action with the redux bindActionCreators()
        binder: () => ({[name]: action})
    }
}

// helper to check for the 'setPublic' augment on an action
export let hasAugmentSetPublic = (action) => {
    if (action.meta && (action.meta.setPublic || action.meta.setPublic === "")) {
        return action.meta.setPublic ? action.meta.setPublic : " "
    }
    return false
}

// helper to check for the 'logout' augment on an action
export let hasAugmentLogout = (action) => (action.meta && action.meta.logout)

// helper to check for the 'loginResponse' augment on an action
export let hasAugmentLogin = (action) => (action.meta && action.meta.loginResponse)
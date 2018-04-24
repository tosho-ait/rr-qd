let doAuthPingResponse = function (action, state) {
    if (action.meta && action.meta.authPingResponse) {
        return Object.assign({}, state, {
            confirmed: true
        })
    }
    return state
}

let doAuthPingError = function (action, state) {
    if (action.meta && action.meta.authPingError) {
        localStorage.removeItem('id_token')
        localStorage.removeItem('id_token_userdetails')
        localStorage.removeItem('id_token_userid')
        return Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            userDetails: null,
            userId: null,
            confirmed: true,
        })
    }
    return state
}

let doLoginRequest = function (action, state) {
    if (action.meta && action.meta.loginRequest) {
        return Object.assign({}, state, {
            loginRequestInProgress: true
        })
    }
    return state
}

let doLoginError = function (action, state) {
    if (action.meta && action.meta.loginError) {
        return Object.assign({}, state, {
            loginRequestInProgress: false
        })
    }
    return state
}

let doLoginResponse = function (action, state) {
    if (action.meta && action.meta.loginResponse) {
        let loginResponse = action.meta.loginResponse(action);
        localStorage.setItem('id_token', loginResponse.token)
        localStorage.setItem('id_token_userdetails', JSON.stringify(loginResponse.userDetails))
        localStorage.setItem('id_token_userid', JSON.stringify(loginResponse.userId))
        return Object.assign({}, state, {
            isAuthenticated: true,
            token: loginResponse.token,
            userDetails: loginResponse.userDetails,
            userId: loginResponse.userId,
            loginRequestInProgress: false
        })
    }
    return state
}

let doLogout = function (action, state) {
    if (action.meta && action.meta.logout) {
        localStorage.removeItem('id_token')
        localStorage.removeItem('id_token_userdetails')
        localStorage.removeItem('id_token_userid')
        return Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            userDetails: null,
            userId: null,
        })
    }
    return state
}

let doLogoutOn403 = function (action, state) {
    if (action.meta && action.meta.logoutOn403) {
        if (action.payload && action.payload.status == 403) {
            localStorage.removeItem('id_token')
            localStorage.removeItem('id_token_userdetails')
            localStorage.removeItem('id_token_userid')
            return Object.assign({}, state, {
                isAuthenticated: false,
                token: null,
                userDetails: null,
                userId: null,
            })
        }
    }
    return state
}

const auth = (state = {
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    token: localStorage.getItem('id_token'),
    userDetails: localStorage.getItem('id_token') ? JSON.parse(localStorage.getItem('id_token_userdetails')) : null,
    userId: localStorage.getItem('id_token') ? localStorage.getItem('id_token_userid') : null,
    confirmed: false, // token is confirmed as valid/invalid by call to server,
    loginRequestInProgress: false // to prevent multiple login requests if the request is done via URL parameters in a redirect
}, action) => {
    let toReturn = state
    toReturn = doLoginRequest(action, toReturn)
    toReturn = doLoginResponse(action, toReturn)
    toReturn = doAuthPingResponse(action, toReturn)
    toReturn = doAuthPingError(action, toReturn)
    toReturn = doLoginError(action, toReturn)
    toReturn = doLogout(action, toReturn)
    toReturn = doLogoutOn403(action, toReturn)
    return toReturn
}

export default auth

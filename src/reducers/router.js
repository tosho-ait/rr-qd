let decodeParams = function (urlString) {
    if (urlString.indexOf("?") < 0) {
        return {};
    } else {
        let match,
            pl = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) {
                return decodeURIComponent(s.replace(pl, " "));
            },
            query = urlString.substr(urlString.indexOf("?") + 1);
        let urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
        return urlParams
    }
}

let doSetPublic = function (action, state) {
    if (action.meta && (action.meta.setPublic || action.meta.setPublic === '')) {
        if (window.location.hash != '#' + action.meta.setPublic) {
            if (window.location.hash != action.meta.setPublic) {
                window.location.hash = '#' + action.meta.setPublic
            }
        }
        if (action.meta.setPublic != state.publicpart) {
            let path = action.meta.setPublic
            if (path.indexOf('?') > -1) {
                path = path.split('?')[0]
            }
            return Object.assign({}, confirmRouteRelease(state), {
                publicpart: path,
                publicprops: decodeParams(action.meta.setPublic)
            })
        }
    }
    return state
}

let confirmRouteRelease = function (state) {
    return Object.assign({}, state, {confirmRoute: false})
}

let setPublicWithoutCheck = function (url) {
    window.location.hash = '#' + url;
    // do not change the public in the state directly, this will be done by the window.onhashchange listener!
    //return setPublic(action.meta.setPublic, state)
}

let doSetPrivateProps = function (action, state) {
    if (action.meta && action.meta.setPrivateProps) {
        return Object.assign({}, state, {
            privateprops: Object.assign({}, state.privateprops, action.meta.setPrivateProps)
        })
    }
    return state
}

let setPrivateProps = function (privateprops, state) {
    if (privateprops != null) {
        return Object.assign({}, state, {privateprops})
    }
    return state
}

let doClearPrivateProps = function (action, state) {
    if (action.meta && action.meta.clearPrivateProps) {
        return Object.assign({}, state, {
            privateprops: {}
        })
    }
    return state
}

let doConfirmRouteRelease = function (action, state) {
    if (action.meta && action.meta.confirmRouteRelease) {
        return Object.assign({}, state, {confirmRoute: false})
    }
    return state
}

let doConfirmRoutePrime = function (action, state) {
    if (action.meta && action.meta.confirmRoutePrime) {
        return Object.assign({}, state, {confirmRoute: true})
    }
    return state
}

let hideMessage = function (state) {
    let massageProp = "_message"
    let msgO = {}
    msgO[massageProp] = null
    return Object.assign({}, state, {messages: Object.assign({}, state.messages, msgO)})
}

let hideInfo = function (state) {
    let massageProp = "_info"
    let msgO = {}
    msgO[massageProp] = null
    return Object.assign({}, state, {messages: Object.assign({}, state.messages, msgO)})
}

let hideWarning = function (state) {
    let massageProp = "_warning"
    let msgO = {}
    msgO[massageProp] = null
    return Object.assign({}, state, {messages: Object.assign({}, state.messages, msgO)})
}

let hideError = function (state) {
    let massageProp = "_error"
    let msgO = {}
    msgO[massageProp] = null
    return Object.assign({}, state, {messages: Object.assign({}, state.messages, msgO)})
}

let doGoToErrorPage = function (action, state) {
    if (action.payload && action.payload.status == 500) {
        state = setPrivateProps({backendError: action.payload}, state)
        setPublicWithoutCheck('error')
    }
    return state
}

let doLogoutOn403 = function (action, state) {
    if (action.meta && action.meta.logoutOn403) {
        if (action.payload && action.payload.status == 403) {
            setPublicWithoutCheck('')
        }
    }
    return state
}

let doResolve = function (action, state) {
    if (action.meta && action.meta.resolve) {
        action.meta.resolve()
    }
    return state
}

let doReject = function (action, state) {
    if (action.meta && action.meta.reject) {
        if (action.payload && action.payload.response && action.payload.response.errors) {
            action.meta.reject(action.payload.response.errors)
        } else if (action.payload && action.payload.response && action.payload.response.messages) {
            action.meta.reject(action.payload.response.messages)
        } else if (action.payload && action.payload.response && action.payload.response.errorMessage) {
            action.meta.reject({_error: action.payload.response.errorMessage})
        } else if (action.payload && action.payload.response && action.payload.response.message) {
            action.meta.reject({_error: action.payload.response.message})
        } else {
            action.meta.reject({_error: "Error!"})
        }
    }
    return state
}

let doShowMessage = function (action, state) {
    let massageProp = "_message"
    if (action.meta && action.meta.showMessage) {
        if (action.payload && action.payload.messages && action.payload.messages[massageProp]) {
            let msgO = {}
            msgO[massageProp] = {text: action.payload.messages[massageProp]}
            return Object.assign({}, state, {messages: Object.assign({}, state.messages, msgO)})
        }
        if (action.meta && action.meta.message) {
            let msgO = {}
            msgO[massageProp] = {text: action.meta.message}
            return Object.assign({}, state, {messages: Object.assign({}, state.messages, msgO)})
        }
    }
    return state
}

let doShowInfoMessage = function (action, state) {
    let massageProp = "_info"
    if (action.meta && action.meta.showInfoMessage) {
        if (action.payload && action.payload.messages && action.payload.messages[massageProp]) {
            let msgO = {}
            msgO[massageProp] = {text: action.payload.messages[massageProp]}
            return Object.assign({}, state, {messages: Object.assign({}, state.messages, msgO)})
        }
        if (action.meta && action.meta._info) {
            let msgO = {}
            msgO[massageProp] = {text: action.meta._info}
            return Object.assign({}, state, {messages: Object.assign({}, state.messages, msgO)})
        }
    }
    return state
}

let doShowWarningMessage = function (action, state) {
    let massageProp = "_warning"
    if (action.meta && action.meta.showWarningMessage) {
        if (action.payload && action.payload.messages && action.payload.messages[massageProp]) {
            let msgO = {}
            msgO[massageProp] = {text: action.payload.messages[massageProp]}
            return Object.assign({}, state, {messages: Object.assign({}, state.messages, msgO)})
        }
        if (action.meta && action.meta._warning) {
            let msgO = {}
            msgO[massageProp] = {text: action.meta._warning}
            return Object.assign({}, state, {messages: Object.assign({}, state.messages, msgO)})
        }
    }
    return state
}

let doHideMessage = function (action, state) {
    if (action.meta && action.meta.hideMessage) {
        return hideMessage(state)
    }
    return state
}

let doHideInfoMessage = function (action, state) {
    if (action.meta && action.meta.hideInfoMessage) {
        return hideInfo(state)
    }
    return state
}

let doHideWarningMessage = function (action, state) {
    if (action.meta && action.meta.hideWarningMessage) {
        return hideWarning(state)
    }
    return state
}

let doShowErrorMessage = function (action, state) {
    let massageProp = "_error"
    if (action.meta && action.meta.showErrorMessage && action.payload && action.payload.response && action.payload.response.messages && action.payload.response.messages[massageProp]) {
        let msgO = {}
        msgO[massageProp] = {text: action.payload.response.messages[massageProp]}
        return Object.assign({}, state, {messages: Object.assign({}, state.messages, msgO)})
    }
    return state
}

let doHideErrorMessage = function (action, state) {
    if (action.meta && action.meta.hideErrorMessage) {
        return hideError(state)
    }
    return state
}

let doScrollTop = function (action, state) {
    if (action.meta && action.meta.scrollTop) {
        window.scrollTo(0, 0)
    }
    return state
}

let initialRouter = {publicpart: "", publicprops: {}, privateprops: {}, messages: {}, confirmRoute: false}

const router = (state = initialRouter, action) => {
    let toReturn = state
    toReturn = doHideMessage(action, toReturn)
    toReturn = doHideInfoMessage(action, toReturn)
    toReturn = doHideWarningMessage(action, toReturn)
    toReturn = doHideErrorMessage(action, toReturn)
    toReturn = doLogoutOn403(action, toReturn)
    toReturn = doResolve(action, toReturn)
    toReturn = doReject(action, toReturn)
    toReturn = doSetPublic(action, toReturn)
    toReturn = doConfirmRouteRelease(action, toReturn)
    toReturn = doConfirmRoutePrime(action, toReturn)
    toReturn = doClearPrivateProps(action, toReturn)
    toReturn = doSetPrivateProps(action, toReturn)
    toReturn = doShowMessage(action, toReturn)
    toReturn = doShowInfoMessage(action, toReturn)
    toReturn = doShowWarningMessage(action, toReturn)
    toReturn = doShowErrorMessage(action, toReturn)
    toReturn = doScrollTop(action, toReturn)
    toReturn = doGoToErrorPage(action, toReturn)
    return toReturn
}

export default router

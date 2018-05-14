import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {apiMiddleware} from 'redux-api-middleware'

let rrInit = (config) => {
    window['rrqd'] = {autoLoadAction: config.autoLoadAction}
    let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, apiMiddleware)(createStore)
    let store = createStoreWithMiddleware(config.reducers)
    let routeChange = () => {
        let value = window.location.hash
        if (value && value.length > 1) {
            value = value.substr(1)
        } else {
            value = ""
        }
        if (store.getState().router.publicpart != value) {
            store.dispatch({type: "DNM", meta: {setPublic: value}})
        }
    }
    // catch changes of the url after the "#" and fire an action to update the store
    window.onhashchange = routeChange
    routeChange()
    window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = store.getState().router.confirmRoute
        if (confirmationMessage) {
            //Gecko + IE
            (e || window.event).returnValue = confirmationMessage
            //Webkit, Safari, Chrome
            return "Are you sure"
        }
    })
    return store
}

export default rrInit



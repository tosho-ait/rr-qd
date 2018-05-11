import {combineReducers} from "redux"

import router from "../../lib/reducers/router"
import auth from "../../lib/reducers/auth"
import props from "../../lib/reducers/props"
import lists from "../../lib/reducers/lists"
import track from "../../lib/reducers/track"

const budgetSimplyApp = combineReducers({
    router,
    auth,
    props,
    lists,
    track,
})

export default budgetSimplyApp


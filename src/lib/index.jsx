import rrInit from './rrInit'
import * as apiDeclare from './actions/apiDeclare'

import auth from './reducers/auth'
import lists from './reducers/lists'
import props from './reducers/props'
import router from './reducers/router'
import track from './reducers/track'

import RrAction from './components/RrAction'
import RrRoute from './components/RrRoute'
import RrSetMomentLocale from './components/RrSetMomentLocale'

let reducers = {auth, lists, props, router, track}

export {rrInit, apiDeclare, reducers, RrAction, RrRoute, RrSetMomentLocale}
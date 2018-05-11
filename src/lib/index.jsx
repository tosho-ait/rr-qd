import rrInit from './rrInit'
import * as rrAccessApi from './actions/rrAccessApi'

import auth from './reducers/auth'
import lists from './reducers/lists'
import props from './reducers/props'
import router from './reducers/router'
import track from './reducers/track'

import RrAction from './components/RrAction'
import RrRoute from './components/RrRoute'
import RrSetMomentLocale from './components/RrSetMomentLocale'

let reducers = {auth, lists, props, router, track}

export {rrInit, rrAccessApi, reducers, RrAction, RrRoute, RrSetMomentLocale}
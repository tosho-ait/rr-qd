import fancyInit from './fancyInit';
import * as apiDeclare from './actions/apiDeclare';

import auth from './reducers/auth';
import lists from './reducers/lists';
import props from './reducers/props';
import router from './reducers/router';
import track from './reducers/track';

let reducers = {auth, lists, props, router, track};

export {fancyInit, apiDeclare, reducers};
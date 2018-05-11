import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux"

import reducers from "./reducers";
import rrInit from "../../lib/rrInit";

import RrAction from "../../lib/components/RrAction";

import "./styles.css";

function Demo() {
    return <div>
        <h1>Demo with examples of the component</h1>
        <RrAction>do something</RrAction>
    </div>
}

let store = rrInit({reducers})

render(<Provider store={store}><Demo /></Provider>, document.getElementById('app'))
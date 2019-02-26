import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux"

import reducers from "./reducers";
import rrInit from "../../lib/rrInit";

import RrAction from "../../lib/components/RrAction";

import "./styles.css";

function Demo() {
    return <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">RR-QD Demo Page</a>
                </div>
            </div>
        </nav>
        <br />
        <br />
        <br />
        <div class="container">
            <h3>RrAction component</h3>
            <RrAction classes="btn btn-default">do something</RrAction>
        </div>
    </div>
}

let store = rrInit({reducers})

render(<Provider store={store}><Demo /></Provider>, document.getElementById('app'))
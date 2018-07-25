import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from "mobx-react";

import stores from './stores/index';
import App from './App';
import Test from './Test';

// console.debug(stores);
// console.debug(process.env.NODE_ENV);
ReactDOM.render(
    <Provider {...stores}>
        <Router>
            <Switch>
                <Route exact={true} path='/' component={App}/>
                <Route exact={true} path='/test' component={Test}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

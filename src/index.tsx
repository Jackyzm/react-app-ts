import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import { useStrict } from 'mobx';
import { Provider } from "mobx-react";
import stores from './stores/index';
import App from './App';
import Home from './Home';

// console.debug(stores);
// console.debug(process.env.NODE_ENV);
// useStrict(true);
ReactDOM.render(
    <Provider {...stores}>
        <Router>
            <Switch>
                <Route exact={true} path='/' component={App}/>
                <Route exact={true} path='/home' component={Home}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

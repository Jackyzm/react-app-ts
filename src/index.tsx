import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Home from './Home';
console.debug(process.env.NODE_ENV);

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact={true} path='/' component={App}/>
            <Route exact={true} path='/home' component={Home}/>
        </Switch>
    </Router>,
    document.getElementById('root') as HTMLElement
);

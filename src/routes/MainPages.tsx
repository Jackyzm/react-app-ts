import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './Dashboard';
import Form from './Form';
import List from './List';
import Exception from './Exception';

/**
 * @class MainPages
 * @extends {React.Component}
 */
class MainPages extends React.Component {
    public render() {
        return (
            <Switch>
                <Route path='/dashboard' component={Dashboard}/>
                <Route path='/form' component={Form}/>
                <Route path='/list' component={List}/>
                <Route path='/exception' component={Exception}/>
                <Redirect from="/" to="/dashboard/analysis"/>
            </Switch>
        );
    }
}

export default MainPages;

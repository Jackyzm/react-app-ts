import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './Dashboard';

/**
 * @class App
 * @extends {React.Component}
 */
class MainPages extends React.Component {
    public render() {
        return (
            <Switch>
                {/* <Route exact={true} path='/' component={App}/> */}
                <Route path='/dashboard' component={Dashboard}/>
                <Redirect from="/" to="/dashboard/analysis"/>
            </Switch>
        );
    }
}

export default MainPages;

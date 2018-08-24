import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Analysis from './Analysis';
import Monitor from './Monitor';
import Workplace from './Workplace';

const PARENT_URL = '/dashboard';

const routeMap = [
    { name: '分析页', path: `${PARENT_URL}/analysis`, component: Analysis },
    { name: '监控页', path: `${PARENT_URL}/monitor`, component: Monitor },
    { name: '工作台', path: `${PARENT_URL}/workplace`, component: Workplace },
]

/**
 * @class
 */
class Dashboard extends React.Component {
    public render() {
        return(
            <div className='Dashboard'>
                    <Switch>
                        {routeMap.map((item, index) => <Route key={index} exact={true} path={item.path} name={item.name} component={item.component} />)}
                    </Switch>
            </div>
        );
    }
}

export default Dashboard;

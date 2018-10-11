import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import BasicProfile from './BasicProfile';
import AdvancedProfile from './AdvancedProfile';

const PARENT_URL = '/profile';

const routeMap = [
    { name: '基础详情页', path: `${PARENT_URL}/basic`, component: BasicProfile },
    { name: '高级详情页', path: `${PARENT_URL}/advanced`, component: AdvancedProfile },
]

/**
 * @class
 */
class Profile extends React.Component {
    public render() {
        return(
            <div className='List'>
                <Switch>
                {routeMap.map((item, index) => {
                    return <Route key={index} exact={true} path={item.path} name={item.name} component={item.component} />
                })}
                </Switch>
            </div>
        );
    }
}

export default Profile;

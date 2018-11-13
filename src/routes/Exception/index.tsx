import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./style.less";

// import FourZeroThree from './403';
// import FourZeroFour from './404';
// import Five from './500';
// import TriggerException from './triggerException';

import { ReactLoadable } from "../../components/ReactLoadable";

const PARENT_URL = "/exception";

const routeMap = [
    {
        name: "403",
        path: `${PARENT_URL}/403`,
        component: ReactLoadable(() => import("./403"))
    },
    {
        name: "404",
        path: `${PARENT_URL}/404`,
        component: ReactLoadable(() => import("./404"))
    },
    {
        name: "500",
        path: `${PARENT_URL}/500`,
        component: ReactLoadable(() => import("./500"))
    },
    {
        name: "触发异常",
        path: `${PARENT_URL}/trigger`,
        component: ReactLoadable(() => import("./triggerException"))
    }
];

/**
 * @class
 */
class Exception extends React.Component {
    public render() {
        return (
            <div className="Exception">
                <Switch>
                    {routeMap.map((item, index) => (
                        <Route
                            key={index}
                            exact={true}
                            path={item.path}
                            name={item.name}
                            component={item.component}
                        />
                    ))}
                </Switch>
            </div>
        );
    }
}

export default Exception;

import * as React from "react";
import { Route, Switch } from "react-router-dom";

// import Success from './Success';
// import Fail from './Error';

import { ReactLoadable } from "../../components/ReactLoadable";

const PARENT_URL = "/result";

const routeMap = [
    {
        name: "成功",
        path: `${PARENT_URL}/success`,
        component: ReactLoadable(() => import("./Success"))
    },
    {
        name: "失败",
        path: `${PARENT_URL}/fail`,
        component: ReactLoadable(() => import("./Error"))
    }
];

/**
 * @class
 */
class Form extends React.Component {
    public render() {
        return (
            <div className="List">
                <Switch>
                    {routeMap.map((item, index) => {
                        return (
                            <Route
                                key={index}
                                exact={true}
                                path={item.path}
                                name={item.name}
                                component={item.component}
                            />
                        );
                    })}
                </Switch>
            </div>
        );
    }
}

export default Form;

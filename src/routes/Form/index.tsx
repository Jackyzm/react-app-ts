import * as React from "react";
import { Route, Switch } from "react-router-dom";

// import BasicForm from "./BasicForm";
// import StepForm from "./StepForm/index";
// import AdvancedForm from "./AdvancedForm";

import { ReactLoadable } from "../../components/ReactLoadable";

const PARENT_URL = "/form";

const routeMap = [
    {
        name: "基础表单",
        path: `${PARENT_URL}/basic-form`,
        component: ReactLoadable(() => import("./BasicForm"))
    },
    {
        name: "分步表单",
        path: `${PARENT_URL}/step-form`,
        component: ReactLoadable(() => import("./StepForm/index"))
    },
    {
        name: "高级表单",
        path: `${PARENT_URL}/advanced-form`,
        component: ReactLoadable(() => import("./AdvancedForm"))
    }
];

/**
 * @class
 */
class Form extends React.Component {
    public render() {
        return (
            <div className="Form">
                <Switch>
                    {routeMap.map((item, index) => {
                        if (index === 1) {
                            return (
                                <Route
                                    key={index}
                                    exact={false}
                                    path={item.path}
                                    name={item.name}
                                    component={item.component}
                                />
                            );
                        } else {
                            return (
                                <Route
                                    key={index}
                                    exact={true}
                                    path={item.path}
                                    name={item.name}
                                    component={item.component}
                                />
                            );
                        }
                    })}
                </Switch>
            </div>
        );
    }
}

export default Form;

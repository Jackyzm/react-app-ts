import * as React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Icon } from "antd";
import GlobalFooter from "../../components/GlobalFooter";

import "./index.less";

// import Login from './Login';
// import Register from './Register';
// import RegisterResult from './RegisterResult';

import { ReactLoadable } from "../../components/ReactLoadable";

const PARENT_URL = "/user";

const routeMap = [
    {
        name: "登录",
        path: `${PARENT_URL}/login`,
        component: ReactLoadable(() => import("./Login"))
    },
    {
        name: "注册",
        path: `${PARENT_URL}/register`,
        component: ReactLoadable(() => import("./Register"))
    },
    {
        name: "注册结果",
        path: `${PARENT_URL}/register-result`,
        component: ReactLoadable(() => import("./RegisterResult"))
    }
];

const links = [
    {
        key: "help",
        title: "帮助",
        href: ""
    },
    {
        key: "privacy",
        title: "隐私",
        href: ""
    },
    {
        key: "terms",
        title: "条款",
        href: ""
    }
];

const copyright = (
    <React.Fragment>
        Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
    </React.Fragment>
);

/**
 * @class
 */
class User extends React.Component {
    public render() {
        return (
            <div className="LoginContent container">
                <div className={"content"}>
                    <div className={"top"}>
                        <div className={"header"}>
                            <Link to="/">
                                <img
                                    alt="logo"
                                    className={"logo"}
                                    src={"img/logo.svg"}
                                />
                                <span className={"title"}>Ant Design</span>
                            </Link>
                        </div>
                        <div className={"desc"}>
                            Ant Design 是西湖区最具影响力的 Web 设计规范
                        </div>
                    </div>
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
                <GlobalFooter links={links} copyright={copyright} />
            </div>
        );
    }
}

export default User;

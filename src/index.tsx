import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import { Provider } from "mobx-react";
import zhCN from 'antd/lib/locale-provider/zh_CN';

import stores from './stores/index';
import App from './App';
import Test from './Test';

// console.debug(stores);
// console.debug(process.env.NODE_ENV);
ReactDOM.render(
    <Provider {...stores}>
        <Router>
            <LocaleProvider locale={zhCN}>
                <Switch>
                    <Route path='/' component={App}/>
                    <Route exact={true} path='/test' component={Test}/>
                </Switch>
            </LocaleProvider>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

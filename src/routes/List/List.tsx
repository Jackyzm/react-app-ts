import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Input } from 'antd';
import PageHeaderLayout from '../../components/PageHeaderLayout';

import Articles from './Articles';
import Projects from './Projects';
import Applications from './Applications';

const PARENT_URL = '/list/search';

const routeMap = [
    { name: '搜索列表（文章）', path: `${PARENT_URL}/articles`, component: Articles },
    { name: '搜索列表（项目）', path: `${PARENT_URL}/projects`, component: Projects },
    { name: '搜索列表（应用）', path: `${PARENT_URL}/applications`, component: Applications },
]

class SearchList extends React.Component<{match, history, location }> {
    private handleFormSubmit = (key) => {
        console.debug(key);
    }
    private handleTabChange = key => {
        const { match } = this.props;
        switch (key) {
            case 'articles':
                this.props.history.push(`${match.url}/articles`);
                // dispatch(routerRedux.push(`${match.url}/articles`));
                break;
            case 'applications':
                this.props.history.push(`${match.url}/applications`);
                // dispatch(routerRedux.push(`${match.url}/applications`));
                break;
            case 'projects':
                this.props.history.push(`${match.url}/projects`);
                // dispatch(routerRedux.push(`${match.url}/projects`));
                break;
            default:
                break;
        }
    };

    public render() {
        const tabList = [
            {
                key: 'articles',
                tab: '文章',
            },
            {
                key: 'applications',
                tab: '应用',
            },
            {
                key: 'projects',
                tab: '项目',
            },
        ];

        const mainSearch = (
            <div style={{ textAlign: 'center' }}>
                <Input.Search
                    placeholder="请输入"
                    enterButton="搜索"
                    size="large"
                    onSearch={this.handleFormSubmit}
                    style={{ width: 522 }}
                />
            </div>
        );

        const { match, location } = this.props;

        return (
            <PageHeaderLayout
                title="搜索列表"
                content={mainSearch}
                tabList={tabList}
                tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
                onTabChange={this.handleTabChange}
            >
                <Switch>
                    {routeMap.map((item, index) => (
                        <Route key={index} path={item.path} component={item.component} exact={true} />
                    ))}
                </Switch>
            </PageHeaderLayout>
        );
    }
}

export default SearchList;

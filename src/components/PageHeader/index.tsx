import * as React from 'react';
import pathToRegexp from 'path-to-regexp';
import { Breadcrumb, Tabs } from 'antd';
import './index.less';

export interface IPageHeaderProps {
    title?: React.ReactNode | string;
    logo?: React.ReactNode | string;
    action?: React.ReactNode | string;
    content?: React.ReactNode;
    extraContent?: React.ReactNode;
    routes?: any[];
    params?: any;
    breadcrumbList?: Array<{ title: React.ReactNode; href?: string }>;
    tabList?: Array<{ key: string; tab: React.ReactNode }>;
    tabActiveKey?: string;
    tabDefaultActiveKey?: string;
    onTabChange?: (key: string) => void;
    tabBarExtraContent?: React.ReactNode;
    linkElement?: React.ReactNode | any;
    style?: React.CSSProperties;
    className?: string,
    location?: object,
    breadcrumbNameMap?: object,
    breadcrumbSeparator?: object
}

const urlToList = (url) => {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => {
      return `/${urllist.slice(0, index + 1).join('/')}`;
    });
}

const { TabPane } = Tabs;
const getBreadcrumb = (breadcrumbNameMap, url) => {
    let breadcrumb = breadcrumbNameMap[url];
    if (!breadcrumb) {
        Object.keys(breadcrumbNameMap).forEach(item => {
            if (pathToRegexp(item, null, null).test(url)) {
                breadcrumb = breadcrumbNameMap[item];
            }
        });
    }
    return breadcrumb || {};
}

export default class PageHeader extends React.Component<IPageHeaderProps, {breadcrumb}> {
    constructor(props) {
        super(props)
        this.state = {
            breadcrumb: null,
        };
    }
    // static contextTypes = {
    //     routes: PropTypes.array,
    //     params: PropTypes.object,
    //     location: PropTypes.object,
    //     breadcrumbNameMap: PropTypes.object,
    // };



    public componentDidMount() {
        console.debug(this.props);
        this.getBreadcrumbDom();
    }

    public componentDidUpdate(preProps) {
        if (preProps.tabActiveKey !== this.props.tabActiveKey) {
            this.getBreadcrumbDom();
        }
    }
    private onChange = key => {
        if (this.props.onTabChange) {
            this.props.onTabChange(key);
        }
    };
    private getBreadcrumbProps = () => {
        return {
            routes: this.props.routes || this.context.routes,
            params: this.props.params || this.context.params,
            routerLocation: this.props.location || this.context.location,
            breadcrumbNameMap: this.props.breadcrumbNameMap || this.context.breadcrumbNameMap,
        };
    };
    private getBreadcrumbDom = () => {
        const breadcrumb = this.conversionBreadcrumbList();
        this.setState({
            breadcrumb,
        });
    };
    // Generated according to props
    private conversionFromProps = () => {
        const { breadcrumbList, breadcrumbSeparator, linkElement = 'a' } = this.props;
        return (
            <Breadcrumb className={'breadcrumb'} separator={breadcrumbSeparator}>
                {breadcrumbList.map((item, index) => (
                    <Breadcrumb.Item key={index}>
                        {item.href
                            ? React.createElement(
                                linkElement,
                                {
                                    [linkElement === 'a' ? 'href' : 'to']: item.href,
                                },
                                item.title
                            )
                            : item.title}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        );
    };
    private conversionFromLocation = (routerLocation, breadcrumbNameMap) => {
        const { breadcrumbSeparator, linkElement = 'a' } = this.props;
        // Convert the url to an array
        const pathSnippets = urlToList(routerLocation.pathname);
        // Loop data mosaic routing
        const extraBreadcrumbItems = pathSnippets.map((url, index) => {
            const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
            const isLinkable = index !== pathSnippets.length - 1 && currentBreadcrumb.component;
            return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
                <Breadcrumb.Item key={url}>
                    {React.createElement(
                        isLinkable ? linkElement : 'span',
                        { [linkElement === 'a' ? 'href' : 'to']: url },
                        currentBreadcrumb.name
                    )}
                </Breadcrumb.Item>
            ) : null;
        });
        // Add home breadcrumbs to your head
        extraBreadcrumbItems.unshift(
            <Breadcrumb.Item key="home">
                {React.createElement(
                    linkElement,
                    {
                        [linkElement === 'a' ? 'href' : 'to']: '/',
                    },
                    '首页'
                )}
            </Breadcrumb.Item>
        );
        return (
            <Breadcrumb className={'breadcrumb'} separator={breadcrumbSeparator}>
                {extraBreadcrumbItems}
            </Breadcrumb>
        );
    };
    /**
     * 将参数转化为面包屑
     * Convert parameters into breadcrumbs
     */
    private conversionBreadcrumbList = () => {
        const { breadcrumbList, breadcrumbSeparator } = this.props;
        const { routes, params, routerLocation, breadcrumbNameMap } = this.getBreadcrumbProps();
        if (breadcrumbList && breadcrumbList.length) {
            return this.conversionFromProps();
        }
        // 如果传入 routes 和 params 属性
        // If pass routes and params attributes
        if (routes && params) {
            return (
                <Breadcrumb
                    className={'breadcrumb'}
                    routes={routes.filter(route => route.breadcrumbName)}
                    params={params}
                    itemRender={this.itemRender}
                    separator={breadcrumbSeparator}
                />
            );
        }
        // 根据 location 生成 面包屑
        // Generate breadcrumbs based on location
        if (routerLocation && routerLocation.pathname) {
            return this.conversionFromLocation(routerLocation, breadcrumbNameMap);
        }
        return null;
    };
    // 渲染Breadcrumb 子节点
    // Render the Breadcrumb child node
    private itemRender = (route, params, routes, paths) => {
        const { linkElement = 'a' } = this.props;
        const last = routes.indexOf(route) === routes.length - 1;
        return last || !route.component ? (
            <span>{route.breadcrumbName}</span>
        ) : (
                React.createElement(
                    linkElement,
                    {
                        href: paths.join('/') || '/',
                        to: paths.join('/') || '/',
                    },
                    route.breadcrumbName
                )
            );
    };

    public render() {
        const {
            title,
            logo,
            action,
            content,
            extraContent,
            tabList,
            className,
            tabActiveKey,
            tabDefaultActiveKey,
            tabBarExtraContent,
        } = this.props;

        const activeKeyProps: { defaultActiveKey: string, activeKey: string} = {defaultActiveKey: '', activeKey: ''};
        if (tabDefaultActiveKey !== undefined) {
            activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
        }
        if (tabActiveKey !== undefined) {
            activeKeyProps.activeKey = tabActiveKey;
        }

        return (
            <div className={`pageHeader ${className? className:''}`}>
                {this.state.breadcrumb}
                <div className={'detail'}>
                    {logo && <div className={'logo'}>{logo}</div>}
                    <div className={'main'}>
                        <div className={'row'}>
                            {title && <h1 className={'title'}>{title}</h1>}
                            {action && <div className={'action'}>{action}</div>}
                        </div>
                        <div className={'row'}>
                            {content && <div className={'content'}>{content}</div>}
                            {extraContent && <div className={'extraContent'}>{extraContent}</div>}
                        </div>
                    </div>
                </div>
                {tabList &&
                    tabList.length && (
                        <Tabs
                            className={'tabs'}
                            {...activeKeyProps}
                            onChange={this.onChange}
                            tabBarExtraContent={tabBarExtraContent}
                        >
                            {tabList.map(item => <TabPane tab={item.tab} key={item.key} />)}
                        </Tabs>
                    )}
            </div>
        );
    }
}

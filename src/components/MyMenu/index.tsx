import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menuData from './menu';

const { SubMenu } = Menu;

/**
 * @class MyMenu
 */
@withRouter
class MyMenu extends React.Component<{}, {collapsed: boolean, openKeys: string[]}> {
    private rootSubmenuKeys = [];
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            openKeys: [],
        }
    }
    public componentWillMount() {
        menuData.map((item)=>{
            this.rootSubmenuKeys.push(item.path);
        });
        console.debug(this.props);
    }
    private onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.setState({ openKeys });
        } else {
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
        }
    }
    public render() {
        return (
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                openKeys={this.state.openKeys}
                onOpenChange={(key)=>this.onOpenChange(key)}
            >
            {
                menuData.map((item: { children: [{name: string, path: string, hideInMenu?: boolean}], icon: string, name: string, path: string }, index: number)=>{
                    if (!item.children) {
                        return (
                            <Menu.Item key={index}>
                                <Icon type={item.icon} />
                                <span>{item.name}</span>
                            </Menu.Item>
                        );
                    } else {
                        return (
                            <SubMenu key={item.path} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                                {
                                    item.children.map((value: { path: string, name: string }, num: number)=>{
                                        return (
                                            <Menu.Item key={`${index}${num}`}>
                                                <NavLink to={`/${item.path}/${value.path}`}>
                                                    <span>{value.name}</span>
                                                </NavLink>
                                            </Menu.Item>
                                        );
                                    })
                                }
                            </SubMenu>
                        );
                    }
                })
            }
            </Menu>
        );
    }
}

export default MyMenu;

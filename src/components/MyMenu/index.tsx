import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menuData from './menu';

const { SubMenu } = Menu;
/**
 * @class MyMenu
 */
class MyMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }
    public render() {
        return (
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
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
                            <SubMenu key={index} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                                {
                                    item.children.map((value: { path: string, name: string }, num: number)=>{
                                        return (
                                            <Menu.Item key={`${index}${num}`}>
                                                <Link to={`/${item.path}/${value.path}`}>
                                                    <span>{value.name}</span>
                                                </Link>
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

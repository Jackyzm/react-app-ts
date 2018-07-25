import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './App.less';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

/**
 * @class Home
 */
class Home extends React.Component<{}, { collapsed: boolean }> {

    /**
     * @param {*} props
     * @memberof Home
     */
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }
    private onCollapse() {
        this.setState({ collapsed: !this.state.collapsed });
    }
    public render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible={true}
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                        </Menu.Item>
                        <SubMenu key="sub2" title={<span><Icon type="user" /><span>User</span></span>}>
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="notification" /><span>大撒大撒</span></span>}>
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={()=> this.onCollapse()}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        Content
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Home;

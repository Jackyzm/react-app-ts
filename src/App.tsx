import * as React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import MyMenu from './components/MyMenu';
import MyFooter from './components/MyFooter';
import MyHeader from './components/MyHeader';
import './App.less';

const { Header, Sider, Content, Footer } = Layout;

/**
 * @class Home
 */
class App extends React.Component<{}, { collapsed: boolean }> {

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
                    <div className={"logo"} key="logo">
                        <Link to="/">
                            <img src={'img/logo.svg'} alt="logo" />
                            <h1>Ant Design Pro</h1>
                        </Link>
                    </div>
                    <MyMenu/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        {/* <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={()=> this.onCollapse()}
                        /> */}
                        <MyHeader
                            collapsed={this.state.collapsed}
                            onCollapse={()=> this.onCollapse()}
                            currentUser={{avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', name: 'Serati Ma', notifyCount: 15}}
                            onMenuClick={(key)=>console.debug(key)}
                            // notices={notices}
                        />
                    </Header>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                        Content
                    </Content>
                    <Footer style={{padding: 0}}>
                        <MyFooter/>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default App;

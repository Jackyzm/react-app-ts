import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Layout, message } from 'antd';
import MyMenu from './components/MyMenu';
import MyFooter from './components/MyFooter';
import MyHeader from './components/MyHeader';
import MainPages from './routes/MainPages';
import './App.less';

const { Header, Sider, Content, Footer } = Layout;

/**
 * @class Home
 */
@inject((store: { Header }) => {
    return {
        changeFetchNotice: store.Header.changeFetchNotice,
        clearNotices: store.Header.clearNotices,
    }
})
@observer
class App extends React.Component<{ changeFetchNotice: () => void, clearNotices: (type: string) => void, history }, { collapsed: boolean }> {

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
    private handleNoticeVisibleChange() {
        this.props.changeFetchNotice();
    };
    private handleNoticeClear = type => {
        message.success(`清空了${type}`);
        this.props.clearNotices(type);
    };
    private handleMenuClick({ key }) {
        if (key === 'triggerError') {
            this.props.history.push('/exception/trigger');
            return;
        }
        if (key === 'logout') {
            this.props.history.push('/user/login');
        }
    };
    public render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible={true}
                    collapsed={this.state.collapsed}
                    style={{ zIndex: 10 }}
                >
                    <div className={"logo"} key="logo">
                        <Link to="/">
                            <img src={'img/logo.svg'} alt="logo" />
                            <h1>Ant Design Pro</h1>
                        </Link>
                    </div>
                    <MyMenu />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <MyHeader
                            collapsed={this.state.collapsed}
                            onCollapse={() => this.onCollapse()}
                            // currentUser={{avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png', name: 'Serati Ma', notifyCount: 15}}
                            onMenuClick={(key) => this.handleMenuClick(key)}
                            onNoticeVisibleChange={() => this.handleNoticeVisibleChange()}
                            onNoticeClear={(type) => this.handleNoticeClear(type)}
                        />
                    </Header>
                    <Content style={{ margin: '24px 24px 0' }}>
                        <MainPages />
                    </Content>
                    <Footer style={{ padding: 0 }}>
                        <MyFooter />
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default App;

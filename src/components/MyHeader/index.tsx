import * as React from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar, Tooltip, Tag } from 'antd';
import { observer, inject } from 'mobx-react';
// import { Link } from 'react-router-dom';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import { IMyObj } from '../NoticeIcon';
import './index.less';

export interface IMyHeaderProps {
    collapsed: boolean,
    onCollapse: (collapsed:boolean)=> void,
    currentUser: {name: string, avatar:string, notifyCount: number},
    onMenuClick: (key)=>void,
    onNoticeClear: ()=>void,
    onNoticeVisibleChange: ()=>void,
    getHeaderNotice?: ()=>void,
    list?: IMyObj[],
    fetchNotice?: boolean,
};

@inject( (store: {Header}) => {
    return {
        list: store.Header.list,
        fetchNotice: store.Header.fetchNotice,
        getHeaderNotice: store.Header.getHeaderNotice
    }
})
@observer
class MyHeader extends React.Component<IMyHeaderProps, {}> {
    public componentWillMount() {
        // console.debug(this.props);
        if (this.props.getHeaderNotice) {
            this.props.getHeaderNotice();
        }
    }

    private toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        // this.triggerResizeEvent();
    };
    /* eslint-disable*/
    // @Debounce(600)
    // triggerResizeEvent() {
    //     const event = document.createEvent('HTMLEvents');
    //     event.initEvent('resize', true, false);
    //     window.dispatchEvent(event);
    // }
    public render() {
        const {
            currentUser,
            collapsed,
            // fetchingNotices,
            onNoticeVisibleChange,
            onMenuClick,
            onNoticeClear,
            list,
            fetchNotice
        } = this.props;
        const menu = (
            <Menu className={'menu'} selectedKeys={[]} onClick={onMenuClick}>
                <Menu.Item disabled={true}>
                    <Icon type="user" />个人中心
                </Menu.Item>
                <Menu.Item disabled={true}>
                    <Icon type="setting" />设置
                </Menu.Item>
                <Menu.Item key="triggerError">
                    <Icon type="close-circle" />触发报错
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <div className={'header'}>
                {/* <Link to="/" className={'logo'} key="logo">
                    <img src={'img/logo.svg'} alt="logo" width="32" />
                </Link> */}
                <Icon
                    className={'trigger'}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <div className={'right'}>
                    <HeaderSearch
                        className={'action search'}
                        placeholder="站内搜索"
                        dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                        onSearch={value => {
                            console.log('input', value); // eslint-disable-line
                        }}
                        onPressEnter={value => {
                            console.log('enter', value); // eslint-disable-line
                        }}
                        defaultOpen={false}
                    />
                    <Tooltip title="使用文档">
                        <a
                            target="_blank"
                            href="https://github.com/Jackyzm/react-app-ts"
                            rel="noopener noreferrer"
                            className={'action'}
                        >
                            <Icon type="question-circle-o" />
                        </a>
                    </Tooltip>
                    <NoticeIcon
                        className={'action'}
                        count={currentUser.notifyCount}
                        onItemClick={(item, tabProps) => {
                            console.log(item, tabProps); // eslint-disable-line
                        }}
                        onClear={onNoticeClear}
                        onPopupVisibleChange={onNoticeVisibleChange}
                        // popupAlign={{ offset: [20, -16] }}
                        locale = {{
                            emptyText: '暂无数据',
                            clear: '清空',
                        }}
                        loading= {fetchNotice}
                        onTabChange={()=>console.debug('11')}
                        notices={list}
                    >
                        {/* <NoticeIcon.Tab
                            list={noticeData['通知']}
                            title="通知"
                            emptyText="你已查看所有通知"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                        />
                        <NoticeIcon.Tab
                            list={noticeData['消息']}
                            title="消息"
                            emptyText="您已读完所有消息"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                        />
                        <NoticeIcon.Tab
                            list={noticeData['待办']}
                            title="待办"
                            emptyText="你已完成所有待办"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                        /> */}
                    </NoticeIcon>

                    {currentUser.name ? (
                        <Dropdown overlay={menu}>
                            <span className={'action account'}>
                                <Avatar size="small" className={'avatar'} src={currentUser.avatar} />
                                <span className={'name'}>{currentUser.name}</span>
                            </span>
                        </Dropdown>
                    ) : (
                            <Spin size="small" style={{ marginLeft: 8 }} />
                        )}
                </div>
            </div>
        );
    }
}

export default MyHeader;

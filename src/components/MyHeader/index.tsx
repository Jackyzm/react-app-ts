import * as React from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar, Tooltip, Tag } from 'antd';
import { observer, inject } from 'mobx-react';
// import { Link } from 'react-router-dom';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import { INoticesObj } from '../NoticeIcon';
import './index.less';

export interface IMyHeaderProps {
    collapsed: boolean,
    onCollapse: (collapsed:boolean)=> void,
    // currentUser: {name: string, avatar:string, notifyCount: number},
    onMenuClick: (key)=>void,
    onNoticeClear: (type:string)=>void,
    onNoticeVisibleChange: ()=>void,
    getHeaderNotice?: ()=>void,
    list?: INoticesObj[],
    fetchNotice?: boolean,
    getUserCurrentData?: ()=>void,
    userCurrent?: {name: string, avatar:string, notifyCount: number},
};

@inject( (store: {Header}) => {
    return {
        userCurrent: store.Header.userCurrent,
        getUserCurrentData: store.Header.getUserCurrentData,
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
        if (this.props.getUserCurrentData) {
            this.props.getUserCurrentData();
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
            userCurrent,
            collapsed,
            onNoticeVisibleChange,
            onMenuClick,
            onNoticeClear,
            list,
            fetchNotice
        } = this.props;
        const menu = (
            <Menu className={'menu'} selectedKeys={[]} onClick={(key)=>onMenuClick(key)}>
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
                        count={userCurrent && userCurrent.notifyCount || 0}
                        onItemClick={(item, tabProps) => {
                            console.log(item, tabProps); // eslint-disable-line
                        }}
                        onClear={(type)=> onNoticeClear(type)}
                        onPopupVisibleChange={onNoticeVisibleChange}
                        // popupAlign={{ offset: [20, -16] }}
                        locale = {{
                            emptyText: '暂无数据',
                            clear: '清空',
                        }}
                        loading= {fetchNotice}
                        onTabChange={()=>console.debug('11')}
                        notices={list}
                    />

                    {userCurrent && userCurrent.name ? (
                        <Dropdown overlay={menu}>
                            <span className={'action account'}>
                                <Avatar size="small" className={'avatar'} src={userCurrent.avatar} />
                                <span className={'name'}>{userCurrent.name}</span>
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

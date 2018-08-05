import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar, Tooltip, Tag } from 'antd';
// import { Link } from 'react-router-dom';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import './index.less';

const notices = [
    {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '你收到了 14 份新周报',
        datetime: '2017-08-09',
        type: '通知',
      },
      {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '你推荐的 曲妮妮 已通过第三轮面试',
        datetime: '2017-08-08',
        type: '通知',
      },
      {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: '这种模板可以区分多种通知类型',
        datetime: '2017-08-07',
        read: true,
        type: '通知',
      },
      {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '左侧图标用于区分不同的类型',
        datetime: '2017-08-07',
        type: '通知',
      },
      {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '内容不要超过两行字，超出时自动截断',
        datetime: '2017-08-07',
        type: '通知',
      },
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲丽丽 评论了你',
        description: '描述信息描述信息描述信息',
        datetime: '2017-08-07',
        type: '消息',
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '朱偏右 回复了你',
        description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
        datetime: '2017-08-07',
        type: '消息',
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '标题',
        description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
        datetime: '2017-08-07',
        type: '消息',
      },
      {
        id: '000000009',
        title: '任务名称',
        description: '任务需要在 2017-01-12 20:00 前启动',
        extra: '未开始',
        status: 'todo',
        type: '待办',
      },
      {
        id: '000000010',
        title: '第三方紧急代码变更',
        description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
        extra: '马上到期',
        status: 'urgent',
        type: '待办',
      },
      {
        id: '000000011',
        title: '信息安全考试',
        description: '指派竹尔于 2017-01-09 前完成更新并发布',
        extra: '已耗时 8 天',
        status: 'doing',
        type: '待办',
      },
      {
        id: '000000012',
        title: 'ABCD 版本发布',
        description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
        extra: '进行中',
        status: 'processing',
        type: '待办',
      },
]
export interface IMyHeaderProps {
    collapsed: boolean,
    onCollapse: (collapsed:boolean)=> void,
    currentUser: {name: string, avatar:string, notifyCount: number},
    onMenuClick: (key)=>void,
    onNoticeClear: ()=>void,
    onNoticeVisibleChange: ()=>void,
};

class MyHeader extends PureComponent<IMyHeaderProps, {}> {
    public componentWillUnmount() {
        // this.triggerResizeEvent.cancel();
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
                        loading= {false}
                        onTabChange={()=>console.debug('11')}
                        notices={notices}
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

import React, { PureComponent } from 'react';
import { Popover, Icon, Tabs, Badge, Spin, Tag } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import List from './NoticeList';
import './index.less';

const { TabPane } = Tabs;

export interface IMyObj {
    datetime?: string, key?:string, id: string, extra?: any, status?: string, avatar?: string, title: string, type: string, read?: boolean,  description?: string
}
export interface INoticeIconProps {
    onItemClick: (item, tabProps)=>void,
    onClear: (title:string)=>void,
    onTabChange: (tabType: string)=>void,
    locale: { emptyText: string, clear: string },
    loading: boolean,
    count: number,
    className: string,
    onPopupVisibleChange: ()=>void,
    notices: IMyObj[]
}

export default class NoticeIcon extends PureComponent<INoticeIconProps, {tabType: string}> {
    constructor(props) {
        super(props);
        this.state = {
            tabType: props.children && props.children[0] ? props.children[0].props.title : ''
        };
    }
    private getNoticeData() {
        const { notices } = this.props;
        if (!notices || !notices.length) {
            return {};
        }
        const newNotices = notices.map(notice => {
            const newNotice = { ...notice };
            if (newNotice.datetime) {
                newNotice.datetime = moment(notice.datetime).fromNow();
            }
            // transform id to item key
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            if (newNotice.extra && newNotice.status) {
                const color = {
                    todo: '',
                    processing: 'blue',
                    urgent: 'red',
                    doing: 'gold',
                }[newNotice.status];
                newNotice.extra = (
                    <Tag color={color} style={{ marginRight: 0 }}>
                        {newNotice.extra}
                    </Tag>
                );
            }
            return newNotice;
        });
        return groupBy(newNotices, 'type');
    }
    private onItemClick = (item, tabProps) => {
        const { onItemClick } = this.props;
        onItemClick(item, tabProps);
    };
    private onTabChange = tabType => {
        console.debug(tabType);
        this.setState({ tabType });
        this.props.onTabChange(tabType);
    };
    private getNotificationBox() {
        const { loading, locale } = this.props;
        const noticeData = this.getNoticeData();

        // <NoticeIcon.Tab
        //     list={noticeData['通知']}
        //     title="通知"
        //     emptyText="你已查看所有通知"
        //     emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
        // />
        // <NoticeIcon.Tab
        //     list={noticeData['消息']}
        //     title="消息"
        //     emptyText="您已读完所有消息"
        //     emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        // />
        // <NoticeIcon.Tab
        //     list={noticeData['待办']}
        //     title="待办"
        //     emptyText="你已完成所有待办"
        //     emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
        // />
        const dataList = [
            {
                list: noticeData['通知'],
                title: "通知",
                emptyText: "你已查看所有通知",
                emptyImage: "https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            },
            {
                list: noticeData['消息'],
                title: "消息",
                emptyText: "您已读完所有消息",
                emptyImage: "https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            },
            {
                list: noticeData['待办'],
                title: "待办",
                emptyText: "你已完成所有待办",
                emptyImage: "https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            },
        ];
        const panes = dataList.map((item) => {
            const title =
                    item.list && item.list.length > 0
                    ? `${item.title} (${item.list.length})`
                    : item.title;
            return (
                <TabPane tab={title} key={item.title}>
                    <List
                        {...item}
                        data={item.list}
                        onClick={value => this.onItemClick(value, item)}
                        onClear={() => this.props.onClear(item.title)}
                        title={item.title}
                        locale={locale}
                    />
                </TabPane>
            );
        });
        return (
            <Spin spinning={loading} delay={0}>
                <Tabs className={'tabs'} onChange={this.onTabChange}>
                    {panes}
                </Tabs>
            </Spin>
        );
    }
    public render() {
        const { count } = this.props;
        const notificationBox = this.getNotificationBox();
        const trigger = (
            <span className={'noticeButton'}>
                <Badge count={count} className={'badge'}>
                    <Icon type="bell" className={'icon'} />
                </Badge>
            </span>
        );
        if (!notificationBox) {
            return trigger;
        }

        return (
            <Popover
                placement="bottomRight"
                content={notificationBox}
                trigger="click"
                arrowPointAtCenter={true}
                // popupAlign={this.props.popupAlign}
                onVisibleChange={this.props.onPopupVisibleChange}
                // {...popoverProps}
            >
                {trigger}
            </Popover>
        );
    }
}

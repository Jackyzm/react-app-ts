import * as React from 'react';
import { Avatar, List } from 'antd';
import './NoticeList.less';

export interface INoticeListProps {
    data: [{read: boolean, avatar: string, title: string, extra, description: string, datetime: string, key: string }],
    onClick: (item) => void,
    onClear: () => void,
    title: string,
    locale: { emptyText: string, clear: string },
    emptyText: string,
    emptyImage: string,
}
class NoticeList extends React.Component<INoticeListProps>{
    constructor(props) {
        super(props);
    }
    public render() {
        const { data, emptyImage, emptyText, locale, onClick, onClear, title } = this.props;
        if (!data.length) {
            return (
                <div className={'notFound'}>
                    {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
                    <div>{emptyText || locale.emptyText}</div>
                </div>
            );
        }
        return (
            <div className={'listContent'}>
                <List
                    className={'list'}
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item className={item.read ? 'item read' : 'item'} key={item.key || index} >
                            <div style={{width: '100%'}} onClick={() => onClick(item)}>
                                <List.Item.Meta
                                    className={'meta'}
                                    avatar={item.avatar ? <Avatar className={'avatar'} src={item.avatar} /> : null}
                                    title={
                                        <div className={'title'}>
                                            {item.title}
                                            <div className={'extra'}>{item.extra}</div>
                                        </div>
                                    }
                                    description={
                                        <div>
                                            <div className={'description'} title={item.description}>
                                                {item.description}
                                            </div>
                                            <div className={'datetime'}>{item.datetime}</div>
                                        </div>
                                    }
                                />
                            </div>
                        </List.Item>
                    )}
                />
                <div className={'clear'} onClick={onClear}>
                    {locale.clear}
                    {title}
                </div>
            </div>
        );
    }
}

export default NoticeList;

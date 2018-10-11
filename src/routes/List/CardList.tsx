import * as React from 'react';
import { observer, inject} from 'mobx-react';
import { Card, Button, Icon, List } from 'antd';

import Ellipsis from '../../components/Ellipsis';
import PageHeaderLayout from '../../components/PageHeaderLayout';

import './CardList.less';

@inject( (store: {FakeList} )=>{
    return {
        list: store.FakeList.list,
        getList: store.FakeList.getList,
        clearList: store.FakeList.clearList,
        loading: store.FakeList.loading,
    }
})
@observer
class CardList extends React.Component<{list, loading:boolean, getList:(params)=>void, clearList: ()=>void}> {
    public componentDidMount() {
        this.props.getList({count: 8});
    }

    public componentWillUnmount() {
        this.props.clearList();
    }

    public render() {
        const { list, loading } = this.props;

        const content = (
            <div className={'pageHeaderContent'}>
                <p>
                    段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
                    提供跨越设计与开发的体验解决方案。
                </p>
                <div className={'contentLink'}>
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
                        快速开始
                    </a>
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
                        产品简介
                    </a>
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
                        产品文档
                    </a>
                </div>
            </div>
        );

        const extraContent = (
            <div className={'extraImg'}>
                <img
                    alt="这是一个标题"
                    src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
                />
            </div>
        );

        return (
            <PageHeaderLayout title="卡片列表" content={content} extraContent={extraContent}>
                <div className={'cardList'}>
                    <List
                        rowKey="id"
                        loading={loading}
                        grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                        dataSource={['', ...list]}
                        renderItem={item =>
                            item ? (
                                <List.Item key={item.id}>
                                    <Card hoverable={true} className={'card'} actions={[<a key={0}>操作一</a>, <a key={1}>操作二</a>]}>
                                        <Card.Meta
                                            avatar={<img alt="" className={'cardAvatar'} src={item.avatar} />}
                                            title={<a href="#">{item.title}</a>}
                                            description={
                                                <Ellipsis className={'item'} lines={3}>
                                                    {item.description}
                                                </Ellipsis>
                                            }
                                        />
                                    </Card>
                                </List.Item>
                            ) : (
                                    <List.Item>
                                        <Button type="dashed" className={'newButton'}>
                                            <Icon type="plus" /> 新增产品
                                        </Button>
                                    </List.Item>
                                )
                        }
                    />
                </div>
            </PageHeaderLayout>
        );
    }
}

export default CardList;

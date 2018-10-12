import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../components/PageHeaderLayout';
import './BasicProfile.less';

const { Description } = DescriptionList;

const progressColumns = [
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '当前进度',
        dataIndex: 'rate',
        key: 'rate',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text =>
            text === 'success' ? (
                <Badge status="success" text="成功" />
            ) : (
                    <Badge status="processing" text="进行中" />
                ),
    },
    {
        title: '操作员ID',
        dataIndex: 'operator',
        key: 'operator',
    },
    {
        title: '耗时',
        dataIndex: 'cost',
        key: 'cost',
    },
];

@inject( (store: {BasicProfile}) => {
    return {
        profile: store.BasicProfile.list,
        getList: store.BasicProfile.getList,
        clearList: store.BasicProfile.clearList,
    }
})
@observer
class BasicProfile extends React.Component<{profile:{ basicGoods, basicProgress}, loading:boolean, getList: ()=>void, clearList:()=>void}> {
    public componentDidMount() {
        this.props.getList();
    }

    public componentWillUnmount() {
        this.props.clearList();
    }

    public render() {
        const { profile={basicGoods:[],basicProgress:[]}, loading } = this.props;
        const { basicGoods, basicProgress } = profile;
        let goodsData = [];
        if (basicGoods && basicGoods.length) {
            let num = 0;
            let amount = 0;
            basicGoods.forEach(item => {
                num += Number(item.num);
                amount += Number(item.amount);
            });
            goodsData = basicGoods.concat({
                id: '总计',
                num,
                amount,
            });
        }
        const goodsColumns = [
            {
                title: '商品编号',
                dataIndex: 'id',
                key: 'id',
                render: (text, row, index) => {
                    if (index < basicGoods.length) {
                        return <a href="">{text}</a>;
                    }
                    return <span style={{ fontWeight: 600 }}>总计</span>;
                },
            },
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品条码',
                dataIndex: 'barcode',
                key: 'barcode',
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
                align: 'right' as "right" | "left" | "center",
            },
            {
                title: '数量（件）',
                dataIndex: 'num',
                key: 'num',
                align: 'right' as "right" | "left" | "center",
                render: (text, row, index) => {
                    if (index < basicGoods.length) {
                        return text;
                    }
                    return <span style={{ fontWeight: 600 }}>{text}</span>;
                },
            },
            {
                title: '金额',
                dataIndex: 'amount',
                key: 'amount',
                align: 'right' as "right" | "left" | "center",
                render: (text, row, index) => {
                    if (index < basicGoods.length) {
                        return text;
                    }
                    return <span style={{ fontWeight: 600 }}>{text}</span>;
                },
            },
        ];
        return (
            <PageHeaderLayout title="基础详情页">
                <Card bordered={false}>
                    <DescriptionList size="large" title="退款申请" style={{ marginBottom: 32 }}>
                        <Description term="取货单号">1000000000</Description>
                        <Description term="状态">已取货</Description>
                        <Description term="销售单号">1234123421</Description>
                        <Description term="子订单">3214321432</Description>
                    </DescriptionList>
                    <Divider style={{ marginBottom: 32 }} />
                    <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
                        <Description term="用户姓名">付小小</Description>
                        <Description term="联系电话">18100000000</Description>
                        <Description term="常用快递">菜鸟仓储</Description>
                        <Description term="取货地址">浙江省杭州市西湖区万塘路18号</Description>
                        <Description term="备注">无</Description>
                    </DescriptionList>
                    <Divider style={{ marginBottom: 32 }} />
                    <div className={'title BasicProfile'}>退货商品</div>
                    <Table
                        style={{ marginBottom: 24 }}
                        pagination={false}
                        loading={loading}
                        dataSource={goodsData}
                        columns={goodsColumns}
                        rowKey="id"
                    />
                    <div className={'title'}>退货进度</div>
                    <Table
                        style={{ marginBottom: 16 }}
                        pagination={false}
                        loading={loading}
                        dataSource={basicProgress}
                        columns={progressColumns}
                    />
                </Card>
            </PageHeaderLayout>
        );
    }
}

export default BasicProfile;

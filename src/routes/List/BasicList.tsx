import * as React from 'react';
import moment from 'moment';
import { List, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar } from 'antd';

import PageHeaderLayout from '../../components/PageHeaderLayout';

import './BasicList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

// @connect(({ list, loading }) => ({
//     list,
//     loading: loading.models.list,
// }))
class BasicList extends React.Component<{loading:boolean, list }> {
    public componentDidMount() {
        // this.props.dispatch({
        //     type: 'list/fetch',
        //     payload: {
        //         count: 5,
        //     },
        // });
    }

    public render() {
        const { list, loading } = this.props;

        const Info = ({ title, value, bordered }) => (
            <div className={'headerInfo'}>
                <span>{title}</span>
                <p>{value}</p>
                {bordered && <em />}
            </div>
        );

        const extraContent = (
            <div className={'extraContent'}>
                <RadioGroup defaultValue="all">
                    <RadioButton value="all">全部</RadioButton>
                    <RadioButton value="progress">进行中</RadioButton>
                    <RadioButton value="waiting">等待中</RadioButton>
                </RadioGroup>
                <Search className={'extraContentSearch'} placeholder="请输入" onSearch={() => ({})} />
            </div>
        );

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: 5,
            total: 50,
        };

        const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
            <div className={'listContent'}>
                <div className={'listContentItem'}>
                    <span>Owner</span>
                    <p>{owner}</p>
                </div>
                <div className={'listContentItem'}>
                    <span>开始时间</span>
                    <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
                </div>
                <div className={'listContentItem'}>
                    <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
                </div>
            </div>
        );

        const menu = (
            <Menu>
                <Menu.Item>
                    <a>编辑</a>
                </Menu.Item>
                <Menu.Item>
                    <a>删除</a>
                </Menu.Item>
            </Menu>
        );

        const MoreBtn = () => (
            <Dropdown overlay={menu}>
                <a>
                    更多 <Icon type="down" />
                </a>
            </Dropdown>
        );

        return (
            <PageHeaderLayout>
                <div className={'standardList'}>
                    <Card bordered={false}>
                        <Row>
                            <Col sm={8} xs={24}>
                                <Info title="我的待办" value="8个任务" bordered={true} />
                            </Col>
                            <Col sm={8} xs={24}>
                                <Info title="本周任务平均处理时间" value="32分钟" bordered={true} />
                            </Col>
                            <Col sm={8} xs={24}>
                                <Info title="本周完成任务数" value="24个任务" bordered={false} />
                            </Col>
                        </Row>
                    </Card>

                    <Card
                        className={'listCard'}
                        bordered={false}
                        title="标准列表"
                        style={{ marginTop: 24 }}
                        bodyStyle={{ padding: '0 32px 40px 32px' }}
                        extra={extraContent}
                    >
                        <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus">
                            添加
                        </Button>
                        <List
                            size="large"
                            rowKey="id"
                            loading={loading}
                            pagination={paginationProps}
                            dataSource={list}
                            renderItem={item => (
                                <List.Item actions={[<a key={0}>编辑</a>, <MoreBtn key={1} />]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.logo} shape="square" size="large" />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.subDescription}
                                    />
                                    <ListContent data={item} />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </PageHeaderLayout>
        );
    }
}

export default BasicList;

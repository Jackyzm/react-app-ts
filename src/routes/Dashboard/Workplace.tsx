import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Row, Col, Card, List, Avatar } from 'antd';
import { observer, inject } from 'mobx-react';

import { Radar } from '../../components/Charts';
import EditableLinkGroup from '../../components/EditableLinkGroup';
import PageHeaderLayout from '../../components/PageHeaderLayout';

import './Workplace.less';

const links = [
    {
        title: '操作一',
        href: '',
    },
    {
        title: '操作二',
        href: '',
    },
    {
        title: '操作三',
        href: '',
    },
    {
        title: '操作四',
        href: '',
    },
    {
        title: '操作五',
        href: '',
    },
    {
        title: '操作六',
        href: '',
    },
];

const members = [
    {
        id: 'members-1',
        title: '科学搬砖组',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        link: '',
    },
    {
        id: 'members-2',
        title: '程序员日常',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
        link: '',
    },
    {
        id: 'members-3',
        title: '设计天团',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
        link: '',
    },
    {
        id: 'members-4',
        title: '中二少女团',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
        link: '',
    },
    {
        id: 'members-5',
        title: '骗你学计算机',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
        link: '',
    },
];

export interface INoticeObj {
    id: string,
    logo: string,
    href: string,
    title: string,
    description: string,
    memberLink: string,
    member: string,
    updatedAt: string
}
export interface IWorkplaceProps {
    notice: INoticeObj[],
    projectLoading?: boolean,
    activitiesLoading?: boolean,
    chart?: { radarData },
    activitiesList: any,
    getNoticeData?: ()=>void,
    clearWorkplace?: ()=>void,
    getActivitiesData?: ()=> void,
    getChartsData?: ()=>void,
}
@inject((store: { Workplace, Analysis })=>{
    return {
        notice: store.Workplace.notice,
        getNoticeData: store.Workplace.getNoticeData,
        activitiesList: store.Workplace.activities,
        getActivitiesData: store.Workplace.getActivitiesData,
        chart: store.Analysis.chart,
        getChartsData: store.Analysis.getChartsData,
        clearWorkplace: store.Workplace.clearWorkplace,
    }
})
@observer
class Workplace extends React.Component<IWorkplaceProps> {
    public componentDidMount() {
        if (this.props.getNoticeData) {
            this.props.getNoticeData();
        }
        if (this.props.getActivitiesData) {
            this.props.getActivitiesData();
        }
        if (this.props.getChartsData) {
            this.props.getChartsData();
        }
    }

    public componentWillUnmount() {
        if (this.props.clearWorkplace) {
            this.props.clearWorkplace();
        }
    }

    private renderActivities() {
        const { activitiesList } = this.props;

        return activitiesList && activitiesList.map(item => {
            const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
                if (item[key]) {
                    return (
                        <a href={item[key].link} key={item[key].name}>
                            {item[key].name}
                        </a>
                    );
                }
                return key;
            });
            return (
                <List.Item key={item.id}>
                    <List.Item.Meta
                        avatar={<Avatar src={item.user.avatar} />}
                        title={
                            <span>
                                <a className={'username'}>{item.user.name}</a>
                                &nbsp;
                <span className={'event'}>{events}</span>
                            </span>
                        }
                        description={
                            <span className={'datetime'} title={item.updatedAt}>
                                {moment(item.updatedAt).fromNow()}
                            </span>
                        }
                    />
                </List.Item>
            );
        });
    }

    public render() {
        const {
            notice,
            projectLoading,
            activitiesLoading,
            chart,
        } = this.props;
        let radarData = [];
        if (chart) {
            radarData = chart.radarData;
        }
        const pageHeaderContent = (
            <div className={'pageHeaderContent'}>
                <div className={'avatar'}>
                    <Avatar
                        size="large"
                        src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                    />
                </div>
                <div className={'content'}>
                    <div className={'contentTitle'}>早安，曲丽丽，祝你开心每一天！</div>
                    <div>交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</div>
                </div>
            </div>
        );

        const extraContent = (
            <div className={'extraContent'}>
                <div className={'statItem'}>
                    <p>项目数</p>
                    <p>56</p>
                </div>
                <div className={'statItem'}>
                    <p>团队内排名</p>
                    <p>
                        8<span> / 24</span>
                    </p>
                </div>
                <div className={'statItem'}>
                    <p>项目访问</p>
                    <p>2,223</p>
                </div>
            </div>
        );
        return (
            <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent}>
                <Row gutter={24}>
                    <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            className={'projectList'}
                            style={{ marginBottom: 24 }}
                            title="进行中的项目"
                            bordered={false}
                            extra={<Link to="/">全部项目</Link>}
                            loading={projectLoading}
                            bodyStyle={{ padding: 0 }}
                        >
                            {notice && notice.map(item => {
                                return <Card.Grid className={'projectGrid'} key={item.id}>
                                    <Card bodyStyle={{ padding: 0 }} bordered={false}>
                                        <Card.Meta
                                            title={
                                                <div className={'cardTitle'}>
                                                    <Avatar size="small" src={item.logo} />
                                                    <Link to={item.href}>{item.title}</Link>
                                                </div>
                                            }
                                            description={item.description}
                                        />
                                        <div className={'projectItemContent'}>
                                            <Link to={item.memberLink}>{item.member || ''}</Link>
                                            {item.updatedAt && (
                                                <span className={'datetime'} title={item.updatedAt}>
                                                    {moment(item.updatedAt).fromNow()}
                                                </span>
                                            )}
                                        </div>
                                    </Card>
                                </Card.Grid>
                            })}
                        </Card>
                        <Card
                            bodyStyle={{ padding: 0 }}
                            bordered={false}
                            className={'activeCard'}
                            title="动态"
                            loading={activitiesLoading}
                        >
                            <List loading={activitiesLoading} size="large" renderItem={[]} dataSource={[]}>
                                <div className={'activitiesList'}>{this.renderActivities()}</div>
                            </List>
                        </Card>
                    </Col>
                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            style={{ marginBottom: 24 }}
                            title="快速开始 / 便捷导航"
                            bordered={false}
                            bodyStyle={{ padding: 0 }}
                        >
                            <EditableLinkGroup onAdd={() => console.debug('12')} links={links} linkElement={Link} />
                        </Card>
                        <Card
                            style={{ marginBottom: 24 }}
                            bordered={false}
                            title="XX 指数"
                            loading={radarData && radarData.length === 0}
                        >
                            <div className={'chart'}>
                                <Radar hasLegend={true} height={343} data={radarData || []} />
                            </div>
                        </Card>
                        <Card bodyStyle={{ paddingTop: 12, paddingBottom: 12 }} bordered={false} title="团队">
                            <div className={'members'}>
                                <Row gutter={48}>
                                    {members && members.map(item => {
                                        return <Col span={12} key={`members-item-${item.id}`}>
                                            <Link to={item.link}>
                                                <Avatar src={item.logo} size="small" />
                                                <span className={'member'}>{item.title}</span>
                                            </Link>
                                        </Col>
                                    })}
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </PageHeaderLayout>
        );
    }
}

export default Workplace;

import * as React from 'react';
import { Button, Row, Col } from 'antd';
import Result from '../../../components/Result';
import './style.less';

class Step3 extends React.Component<{data, history}> {
    public render() {
        const { data = {payAccount: 'ant-design@alipay.com',receiverAccount: 'test@example.com', receiverName: 'Alex', amount: '500'} } = this.props;
        const onFinish = () => {
            this.props.history.push('/form/step-form');
            // dispatch(routerRedux.push('/form/step-form'));
        };
        const information = (
            <div className={'information'}>
                <Row>
                    <Col xs={24} sm={8} className={'label'}>
                        付款账户：
                    </Col>
                    <Col xs={24} sm={16}>
                        {data.payAccount}
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={8} className={'label'}>
                        收款账户：
                    </Col>
                    <Col xs={24} sm={16}>
                        {data.receiverAccount}
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={8} className={'label'}>
                        收款人姓名：
                    </Col>
                    <Col xs={24} sm={16}>
                        {data.receiverName}
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={8} className={'label'}>
                        转账金额：
                    </Col>
                    <Col xs={24} sm={16}>
                        <span className={'money'}>{data.amount}</span> 元
                    </Col>
                </Row>
            </div>
        );
        const actions = (
            <React.Fragment>
                <Button type="primary" onClick={onFinish}>
                    再转一笔
                </Button>
                <Button>查看账单</Button>
            </React.Fragment>
        );
        return (
            <Result
                type="success"
                title="操作成功"
                description="预计两小时内到账"
                extra={information}
                actions={actions}
                className={'result'}
            />
        );
    }
}

export default Step3;

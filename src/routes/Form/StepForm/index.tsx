import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Card, Steps } from 'antd';
import PageHeaderLayout from '../../../components/PageHeaderLayout';
import NotFound from '../../Exception/404';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import './style.less';

const { Step } = Steps;

class StepForm extends React.Component<{location: {pathname: string}}> {
    private getCurrentStep() {
        const { location } = this.props;
        const { pathname } = location;
        const pathList = pathname.split('/');
        console.debug(pathList[pathList.length - 1]);
        switch (pathList[pathList.length - 1]) {
            case 'info':
                return 0;
            case 'confirm':
                return 1;
            case 'result':
                return 2;
            default:
                return 0;
        }
    }
    public render() {
        console.debug(this.props);
        const { location } = this.props;
        return (
            <PageHeaderLayout
                title="分步表单"
                tabActiveKey={location.pathname}
                content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
            >
                <Card bordered={false}>
                    <React.Fragment>
                        <Steps current={this.getCurrentStep()}>
                            <Step title="填写转账信息" />
                            <Step title="确认转账信息" />
                            <Step title="完成" />
                        </Steps>
                        <Switch>
                            {
                                [
                                    { key: 0, name: '步骤1', path: `/form/step-form/info`, component: Step1 },
                                    { key: 1, name: '步骤2', path: `/form/step-form/confirm`, component: Step2 },
                                    { key: 32, name: '结果页', path: `/form/step-form/result`, component: Step3 }
                                ].map(item => (
                                    <Route
                                        key={item.key}
                                        path={item.path}
                                        component={item.component}
                                        exact={true}
                                    />
                            ))}
                            <Redirect from="/form/step-form" to="/form/step-form/info" />
                            <Route render={NotFound} />
                        </Switch>
                    </React.Fragment>
                </Card>
            </PageHeaderLayout>
        );
    }
}

export default StepForm;

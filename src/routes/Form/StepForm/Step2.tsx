import React from 'react';
import { Form, Input, Button, Alert, Divider } from 'antd';
import { digitUppercase } from '../../../utils/utils';
import './style.less';

const formItemLayout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    },
};

class Step2 extends React.Component<{form, data, submitting:boolean, history}> {
    public render() {
        const { form, data = {payAccount: 'ant-design@alipay.com',receiverAccount: 'test@example.com', receiverName: 'Alex', amount: '500'}, submitting } = this.props;
        const { getFieldDecorator, validateFields } = form;
        const onPrev = () => {
            this.props.history.push('/form/step-form');
            // dispatch(routerRedux.push('/form/step-form'));
        };
        const onValidateForm = e => {
            e.preventDefault();
            validateFields((err, values) => {
                if (!err) {
                    // dispatch({
                    //     type: 'form/submitStepForm',
                    //     payload: {
                    //         ...data,
                    //         ...values,
                    //     },
                    // });
                    this.props.history.push('/form/step-form/result');
                }
            });
        };
        return (
            <Form layout="horizontal" className={'stepForm'}>
                <Alert
                    closable={true}
                    showIcon={true}
                    message="确认转账后，资金将直接打入对方账户，无法退回。"
                    style={{ marginBottom: 24 }}
                />
                <Form.Item {...formItemLayout} className={'stepFormText'} label="付款账户">
                    {data.payAccount}
                </Form.Item>
                <Form.Item {...formItemLayout} className={'stepFormText'} label="收款账户">
                    {data.receiverAccount}
                </Form.Item>
                <Form.Item {...formItemLayout} className={'stepFormText'} label="收款人姓名">
                    {data.receiverName}
                </Form.Item>
                <Form.Item {...formItemLayout} className={'stepFormText'} label="转账金额">
                    <span className={'money'}>{data.amount}</span>
                    <span className={'uppercase'}>（{digitUppercase(data.amount)}）</span>
                </Form.Item>
                <Divider style={{ margin: '24px 0' }} />
                <Form.Item {...formItemLayout} label="支付密码" required={false}>
                    {getFieldDecorator('password', {
                        initialValue: '123456',
                        rules: [
                            {
                                required: true,
                                message: '需要支付密码才能进行支付',
                            },
                        ],
                    })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: 8 }}
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: {
                            span: formItemLayout.wrapperCol.span,
                            offset: formItemLayout.labelCol.span,
                        },
                    }}
                    label=""
                >
                    <Button type="primary" onClick={onValidateForm} loading={submitting}>
                        提交
                    </Button>
                    <Button onClick={onPrev} style={{ marginLeft: 8 }}>
                        上一步
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(Step2);

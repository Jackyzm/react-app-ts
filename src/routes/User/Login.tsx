import * as React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Alert, Icon, Form, Tabs, Button, Input, Row, Col } from 'antd';
import './Login.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;

// @connect(({ login, loading }) => ({
//     login,
//     submitting: loading.effects['login/login'],
// }))
class LoginPage extends React.Component<{ login, submitting, form }, { type: string, autoLogin: boolean, active, count: number }> {
    private interval;
    constructor(props) {
        super(props);
        this.state = {
            type: 'account',
            autoLogin: true,
            count: 0,
            active: {
                account: ['userName', 'password'],
                mobile: ['mobile', 'captcha']
            }
        }
    }
    private onTabChange = type => {
        this.setState({ type });
    };

    private handleSubmit = e => {
        e.preventDefault();
        const { active, type } = this.state;
        const activeFileds = active[type];
        this.props.form.validateFields(activeFileds, { force: true }, (err, values) => {
            if (!err) {
                // this.props.dispatch({
                //     type: 'login/login',
                //     payload: {
                //         ...values,
                //         type,
                //     },
                // });
            }
        });
    };
    private changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked,
        });
    };

    public onGetCaptcha = () => {
        let count = 59;
        this.setState({ count });

        this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    };

    private renderMessage = content => {
        return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon={true} />;
    };

    public render() {
        const { login = { status: '', type: '' }, submitting, form } = this.props;
        const { getFieldDecorator } = form;
        const { type, count } = this.state;
        return (
            <div className={'main LoginBox'}>
                <div className={'login'}>
                    <Form onSubmit={this.handleSubmit}>
                        <Tabs
                            animated={false}
                            className={'tabs'}
                            activeKey={type}
                            onChange={this.onTabChange}
                        >
                            <TabPane tab="账户密码登录" key="account">
                                {login.status === 'error' &&
                                    login.type === 'account' &&
                                    !submitting &&
                                    this.renderMessage('账户或密码错误（admin/888888）')}
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: 'Please enter username!' }],
                                    })(
                                        <Input name="userName" size='large' placeholder="admin/user" prefix={<Icon type="user" className={'prefixIcon'} />} />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please enter password!' }],
                                    })(
                                        <Input name="password" size='large' placeholder="888888/123456" prefix={<Icon type="lock" className={'prefixIcon'} />} type='password' />
                                    )}
                                </FormItem>
                            </TabPane>
                            <TabPane key="mobile" tab="手机号登录">
                                {login.status === 'error' &&
                                    login.type === 'mobile' &&
                                    !submitting &&
                                    this.renderMessage('验证码错误')}
                                <FormItem>
                                    {getFieldDecorator('mobile', {
                                        rules: [
                                            { required: true, message: 'Please enter mobile number!' },
                                            { pattern: /^1\d{10}$/, message: 'Wrong mobile number format!' }
                                        ],
                                    })(
                                        <Input name="mobile" placeholder="mobile number" size='large' prefix={<Icon type="mobile" className={'prefixIcon'} />} />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Row gutter={8}>
                                        <Col span={16}>
                                            {getFieldDecorator('captcha', {
                                                rules: [{ required: true, message: 'Please enter Captcha!' }],
                                            })(
                                                <Input name="captcha" placeholder="captcha" size='large' prefix={<Icon type="mail" className={'prefixIcon'} />} />
                                            )}
                                        </Col>
                                        <Col span={8}>
                                            <Button
                                                disabled={count ? true : false}
                                                className={'getCaptcha'}
                                                size="large"
                                                onClick={this.onGetCaptcha}
                                            >
                                                {count ? `${count} s` : '获取验证码'}
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </TabPane>
                        </Tabs>
                        <div>
                            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
                                自动登录
                                </Checkbox>
                            <a style={{ float: 'right' }} href="">
                                忘记密码
                                </a>
                        </div>
                        <FormItem>
                            <Button size="large" className={`submit`} type="primary" htmlType="submit" loading={submitting} >登录</Button>
                        </FormItem>
                        <div className={'other'}>
                            其他登录方式
                                <Icon className={'icon'} type="alipay-circle" />
                            <Icon className={'icon'} type="taobao-circle" />
                            <Icon className={'icon'} type="weibo-circle" />
                            <Link className={'register'} to="/user/register">
                                注册账户
                                </Link>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(LoginPage);

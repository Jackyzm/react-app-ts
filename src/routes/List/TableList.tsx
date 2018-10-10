import * as React from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../components/PageHeaderLayout';

import './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

const CreateForm = Form.create()((props:{modalVisible:boolean, form, handleAdd: (fieldsValue)=>void, handleModalVisible:(flag?)=>void}) => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            form.resetFields();
            handleAdd(fieldsValue);
        });
    };
    return (
        <Modal
            title="新建规则"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
                {form.getFieldDecorator('desc', {
                    rules: [{ required: true, message: 'Please input some description...' }],
                })(<Input placeholder="请输入" />)}
            </FormItem>
        </Modal>
    );
});
export interface ITableListProps {
    form,
    rule,
    loading: boolean,
    getList:(params?)=>void,
    clearList: ()=>void,
    addList: (params)=>void,
    deleteList: (params, callback)=>void,
}
@inject( (store: {TableList}) => {
    return {
        rule: store.TableList.list,
        getList: store.TableList.getList,
        clearList: store.TableList.clearList,
        loading: store.TableList.loading,
        addList: store.TableList.addList,
        deleteList: store.TableList.deleteList,
    }
})
@observer
class TableList extends React.Component<ITableListProps, {modalVisible: boolean, expandForm: boolean, selectedRows, formValues}> {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            expandForm: false,
            selectedRows: [],
            formValues: {},
        }
    }

    public componentDidMount() {
        this.props.getList();
    }

    public componentWillUnmount() {
        this.props.clearList();
    }

    private handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { formValues } = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        this.props.getList(params);
    };

    private handleFormReset = () => {
        const { form } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });

        this.props.getList();
    };

    private toggleForm = () => {
        this.setState({
            expandForm: !this.state.expandForm,
        });
    };

    private handleMenuClick = e => {
        const { selectedRows } = this.state;
        if (!selectedRows) {
            return;
        }

        switch (e.key) {
            case 'remove':
                this.props.deleteList({no: selectedRows.map(row => row.no).join(',')}, () => {
                    this.setState({
                        selectedRows: [],
                    });
                })
                // dispatch({
                //     type: 'rule/remove',
                //     payload: {
                //         no: selectedRows.map(row => row.no).join(','),
                //     },
                //     callback: () => {
                //         this.setState({
                //             selectedRows: [],
                //         });
                //     },
                // });
                break;
            default:
                break;
        }
    };

    private handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    private handleSearch = e => {
        e.preventDefault();

        const { form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }

            const values = {
                ...fieldsValue,
                updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };

            this.setState({
                formValues: values,
            });

            this.props.getList(values);
        });
    };

    private handleModalVisible = flag => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    private handleAdd = fields => {
        this.props.addList({description: fields.desc});

        message.success('添加成功');
        this.setState({
            modalVisible: false,
        });
    };

    private renderSimpleForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="规则编号">
                            {getFieldDecorator('no')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="使用状态">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={'submitButtons'}>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                                重置
                            </Button>
                            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                                展开 <Icon type="down" />
                            </a>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    private renderAdvancedForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="规则编号">
                            {getFieldDecorator('no')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="使用状态">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="调用次数">
                            {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="更新日期">
                            {getFieldDecorator('date')(
                                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="使用状态">
                            {getFieldDecorator('status3')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="使用状态">
                            {getFieldDecorator('status4')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <div style={{ overflow: 'hidden' }}>
                    <span style={{ float: 'right', marginBottom: 24 }}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                            重置
                        </Button>
                        <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            收起 <Icon type="up" />
                        </a>
                    </span>
                </div>
            </Form>
        );
    }

    private renderForm() {
        return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }

    public render() {
        const { rule, loading } = this.props;
        console.debug(rule);
        let data = {};
        if (rule && rule.list) {
            data = rule;
        } else {
            data = {
                list: [],
                pagination: {}
            }
        }
        const { selectedRows, modalVisible } = this.state;

        const columns = [
            {
                title: '规则编号',
                dataIndex: 'no',
            },
            {
                title: '描述',
                dataIndex: 'description',
            },
            {
                title: '服务调用次数',
                dataIndex: 'callNo',
                sorter: true,
                align: 'right',
                render: val => `${val} 万`,
                // mark to display a total number
                needTotal: true,
            },
            {
                title: '状态',
                dataIndex: 'status',
                filters: [
                    {
                        text: status[0],
                        value: 0,
                    },
                    {
                        text: status[1],
                        value: 1,
                    },
                    {
                        text: status[2],
                        value: 2,
                    },
                    {
                        text: status[3],
                        value: 3,
                    },
                ],
                onFilter: (value, record) => record.status.toString() === value,
                render(val) {
                    return <Badge status={statusMap[val] as "default" | "processing" | "success" | "error" | "warning"} text={status[val]} />;
                },
            },
            {
                title: '更新时间',
                dataIndex: 'updatedAt',
                sorter: true,
                render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
            {
                title: '操作',
                render: () => (
                    <React.Fragment>
                        <a href="">配置</a>
                        <Divider type="vertical" />
                        <a href="">订阅警报</a>
                    </React.Fragment>
                ),
            },
        ];

        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
                <Menu.Item key="remove">删除</Menu.Item>
                <Menu.Item key="approval">批量审批</Menu.Item>
            </Menu>
        );

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };

        return (
            <PageHeaderLayout title="查询表格">
                <Card bordered={false}>
                    <div className={'tableList'}>
                        <div className={'tableListForm'}>{this.renderForm()}</div>
                        <div className={'tableListOperator'}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                                新建
                            </Button>
                            {selectedRows.length > 0 && (
                                <span>
                                    <Button>批量操作</Button>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            更多操作 <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </span>
                            )}
                        </div>
                        <StandardTable
                            selectedRows={selectedRows}
                            loading={loading}
                            data={data}
                            columns={columns}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
                <CreateForm {...parentMethods} modalVisible={modalVisible} />
            </PageHeaderLayout>
        );
    }
}

export default Form.create()(TableList);

import * as React from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import './style.less';

class TableForm extends React.Component<{onChange?: (newData)=>void}, {data:Array<{key: string, workId: string, name: string, department: string, editable: boolean, isNew:boolean}>, loading:boolean}> {
    private clickedCancel
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            loading: false,
        };
    }
    public componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                data: nextProps.value,
            });
        }
    }
    private getRowByKey(key, newData?) {
        return (newData || this.state.data).filter(item => item.key === key)[0];
    }

    private index = 0;
    private cacheOriginData = {};

    private toggleEditable = (e, key) => {
        e.preventDefault();
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (target) {
            // 进入编辑状态时保存原始数据
            if (!target.editable) {
                this.cacheOriginData[key] = { ...target };
            }
            target.editable = !target.editable;
            this.setState({ data: newData });
        }
    };
    private remove(key) {
        const newData = this.state.data.filter(item => item.key !== key);
        this.setState({ data: newData });
        this.props.onChange(newData);
    }
    private newMember = () => {
        const newData = this.state.data.map(item => ({ ...item }));
        newData.push({
            key: `NEW_TEMP_ID_${this.index}`,
            workId: '',
            name: '',
            department: '',
            editable: true,
            isNew: true,
        });
        this.index += 1;
        this.setState({ data: newData });
    };
    private handleKeyPress(e, key) {
        if (e.key === 'Enter') {
            this.saveRow(e, key);
        }
    }
    private handleFieldChange(e, fieldName, key) {
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (target) {
            target[fieldName] = e.target.value;
            this.setState({ data: newData });
        }
    }
    private saveRow(e, key) {
        e.persist();
        this.setState({
            loading: true,
        });
        setTimeout(() => {
            if (this.clickedCancel) {
                this.clickedCancel = false;
                return;
            }
            const target = this.getRowByKey(key) || {};
            if (!target.workId || !target.name || !target.department) {
                message.error('请填写完整成员信息。');
                e.target.focus();
                this.setState({
                    loading: false,
                });
                return;
            }
            delete target.isNew;
            this.toggleEditable(e, key);
            this.props.onChange(this.state.data);
            this.setState({
                loading: false,
            });
        }, 500);
    }
    private cancel(e, key) {
        this.clickedCancel = true;
        e.preventDefault();
        const newData = this.state.data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (this.cacheOriginData[key]) {
            Object.assign(target, this.cacheOriginData[key]);
            target.editable = false;
            delete this.cacheOriginData[key];
        }
        this.setState({ data: newData });
        this.clickedCancel = false;
    }
    public render() {
        const columns = [
            {
                title: '成员姓名',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                autoFocus={true}
                                onChange={e => this.handleFieldChange(e, 'name', record.key)}
                                onKeyPress={e => this.handleKeyPress(e, record.key)}
                                placeholder="成员姓名"
                            />
                        );
                    }
                    return text;
                },
            },
            {
                title: '工号',
                dataIndex: 'workId',
                key: 'workId',
                width: '20%',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'workId', record.key)}
                                onKeyPress={e => this.handleKeyPress(e, record.key)}
                                placeholder="工号"
                            />
                        );
                    }
                    return text;
                },
            },
            {
                title: '所属部门',
                dataIndex: 'department',
                key: 'department',
                width: '40%',
                render: (text, record) => {
                    if (record.editable) {
                        return (
                            <Input
                                value={text}
                                onChange={e => this.handleFieldChange(e, 'department', record.key)}
                                onKeyPress={e => this.handleKeyPress(e, record.key)}
                                placeholder="所属部门"
                            />
                        );
                    }
                    return text;
                },
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    if (!!record.editable && this.state.loading) {
                        return null;
                    }
                    if (record.editable) {
                        if (record.isNew) {
                            return (
                                <span>
                                    <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                                    <Divider type="vertical" />
                                    <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                                        <a>删除</a>
                                    </Popconfirm>
                                </span>
                            );
                        }
                        return (
                            <span>
                                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                                <Divider type="vertical" />
                                <a onClick={e => this.cancel(e, record.key)}>取消</a>
                            </span>
                        );
                    }
                    return (
                        <span>
                            <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
                            <Divider type="vertical" />
                            <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    );
                },
            },
        ];

        return (
            <React.Fragment>
                <Table
                    loading={this.state.loading}
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                    rowClassName={record => {
                        return record.editable ? 'editable' : '';
                    }}
                />
                <Button
                    style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                    type="dashed"
                    onClick={this.newMember}
                    icon="plus"
                >
                    新增成员
        </Button>
            </React.Fragment>
        );
    }
}

export default TableForm;

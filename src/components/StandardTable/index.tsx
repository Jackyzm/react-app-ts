import * as React from 'react';
import { Table, Alert } from 'antd';
import './index.less';

function initTotalList(columns) {
    const totalList = [];
    columns.forEach(column => {
        if (column.needTotal) {
            totalList.push({ ...column, total: 0 });
        }
    });
    return totalList;
}

class StandardTable extends React.Component<{onSelectRow:(selectedRows)=>void, onChange:(pagination, filters, sorter)=>void, data, loading: boolean, columns, rowKey?, selectedRows?},{selectedRowKeys, needTotalList}> {
    constructor(props) {
        super(props);
        const { columns } = props;
        const needTotalList = initTotalList(columns);

        this.state = {
            selectedRowKeys: [],
            needTotalList,
        };
    }

    public componentWillReceiveProps(nextProps) {
        // clean state
        if (nextProps.selectedRows.length === 0) {
            const needTotalList = initTotalList(nextProps.columns);
            this.setState({
                selectedRowKeys: [],
                needTotalList,
            });
        }
    }

    private handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        let needTotalList = [...this.state.needTotalList];
        needTotalList = needTotalList.map(item => {
            return {
                ...item,
                total: selectedRows.reduce((sum, val) => {
                    return sum + parseFloat(val[item.dataIndex]);
                }, 0),
            };
        });

        if (this.props.onSelectRow) {
            this.props.onSelectRow(selectedRows);
        }

        this.setState({ selectedRowKeys, needTotalList });
    };

    private handleTableChange = (pagination, filters, sorter) => {
        this.props.onChange(pagination, filters, sorter);
    };

    private cleanSelectedKeys = () => {
        this.handleRowSelectChange([], []);
    };

    public render() {
        const { selectedRowKeys, needTotalList } = this.state;
        const { data: { list, pagination }, loading, columns, rowKey } = this.props;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        };

        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: record.disabled,
            }),
        };

        return (
            <div className={'standardTable'}>
                <div className={'tableAlert'}>
                    <Alert
                        message={
                            <React.Fragment>
                                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                                {needTotalList.map(item => (
                                    <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                                        {item.title}总计&nbsp;
                                        <span style={{ fontWeight: 600 }}>
                                            {item.render ? item.render(item.total) : item.total}
                                        </span>
                                    </span>
                                ))}
                                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                                    清空
                                </a>
                            </React.Fragment>
                        }
                        type="info"
                        showIcon={true}
                    />
                </div>
                <Table
                    loading={loading}
                    rowKey={rowKey || 'key'}
                    rowSelection={rowSelection}
                    dataSource={list}
                    columns={columns}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default StandardTable;

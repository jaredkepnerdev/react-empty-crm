import React from 'react';
import { Table } from 'antd';
import _find from 'lodash/find';

class DataList extends React.Component {

    constructor(props) {
        super(props);
        this.tableClassName = "datalist-" + Date.now() + ' ' + (props.className || '');
        this.state = {
            selectedRowKeys: [],
            ...this.updateRowKey(props),
        };
        this.state = {
            ...this.state,
            data: this.updateData(props, this.state.rowKey),
        };
    }

    componentWillReceiveProps(newProps) {
        let state = this.updateRowKey(newProps);
        state.data = this.updateData(newProps, state.rowKey);
        if (!newProps.loading && this.props.loading) {
            state.selectedRowKeys = [];
        }
        this.setState(state);
    }

    updateRowKey(props) {
        let { columns } = props;
        let keyColumn = _find(columns || [], { rowKey: true });
        if (!keyColumn || !keyColumn.dataIndex) return {
            rowKey: null,
            getRowKey: (row, index) => index
        };

        return {
            rowKey: keyColumn.dataIndex,
            getRowKey: row => {
                return row[keyColumn.dataIndex];
            }
        };
    }

    onSelectChange(selectedRowKeys) {
        let { data, getRowKey } = this.state;
        let { onSelectChange } = this.props;
        let selectedRows = [];

        getRowKey = getRowKey || ((row, index) => index);
        selectedRowKeys.forEach(key => {
            let row = _find(data, (item, index) => {
                if (getRowKey) {
                    return getRowKey(item, index) === key;
                } else {
                    return index === key;
                }
            });
            selectedRows.push(row);
        });
        this.setState({ selectedRowKeys }, () => {
            onSelectChange && onSelectChange(selectedRowKeys, selectedRows);
        });
    }

    updateData(props, rowKey) {
        let { columns, data, emptyRows } = props;
        data = data || [];
        if (!emptyRows) return data;
        
        
        let emptyObj = { __empty:true };
        if (columns && columns[0] && columns[0].dataIndex) {
            emptyObj[columns[0].dataIndex] = '　';
        }
        for (let i = data.length; i < emptyRows; i ++) {
            let obj = { ...emptyObj };
            if (rowKey) obj[rowKey] = Date.now() + '-' + Math.round(Math.random() * 100000) + '-' + i;
            data.push(obj);
        }
        return data;
    }

    getCheckboxProps(row) {
        return this.props.getCheckboxProps ? this.props.getCheckboxProps(row) : {
            disabled: row.__empty,
        };
    }

    render() {
        const { data, selectedRowKeys, getRowKey } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
            getCheckboxProps: this.getCheckboxProps.bind(this),
        };
        return (
            <Table
                rowSelection={rowSelection}
                {...this.props}
                rowKey={getRowKey}
                dataSource={data}
            />
          );
    }
}

export default DataList;
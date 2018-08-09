import React from 'react';
import { Table } from 'antd';

class DataList extends React.Component {

    constructor(props) {
        super(props);
        this.tableClassName = "datalist-" + Date.now() + ' ' + (props.className || '');
        this.state = {
            data: this.updateData(props),
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            data: this.updateData(newProps),
        });
    }

    updateData(props) {
        let { columns, data, emptyRows } = props;
        data = data || [];
        if (!emptyRows) return data;
        
        
        let emptyObj = {};
        if (columns && columns[0] && columns[0].dataIndex) {
            emptyObj[columns[0].dataIndex] = '　';
        }
        for (let i = data.length; i < emptyRows; i ++) {
            data.push(emptyObj);
        }
        return data;
    }

    render() {
        const { data } = this.state;
        const { rowKey } = this.props;
        return (
            <Table
              {...this.props}
              rowKey={rowKey || ((row, index) => index) }
              dataSource={data}
            />
          );
    }
}

export default DataList;
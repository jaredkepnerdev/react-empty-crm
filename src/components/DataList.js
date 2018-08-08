import React from 'react';
import { Table } from 'antd';

class DataList extends React.Component {

    constructor(props) {
        super(props);
        this.tableClassName = "datalist-" + Date.now() + ' ' + (props.className || '');
    }

    render() {
        const {
            data, rowKey
        } = this.props;
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
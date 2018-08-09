import React from 'react';
import BaseTablePage from './BaseTablePage';
import { Icon } from 'antd';

import { mockFetchTableData } from "../../service";

class DemoTablePage extends BaseTablePage {

    componentDidMount() {
        this.doSearch();
    }

    getTableProps() {
        return {
            columns: [
                {
                    title: 'Company',
                    dataIndex: 'company',
                    render: name => name,
                    // sorter: true,
                    // width: '20%',
                }, {
                    title: 'Username',
                    dataIndex: 'username',
                    // filters: [
                    //     { text: 'Male', value: 'male' },
                    //     { text: 'Female', value: 'female' },
                    // ],
                }, {
                    title: 'Phone',
                    dataIndex: 'phone',
                }, {
                    title: 'Cell',
                    dataIndex: 'cell',
                }
            ]
        };
    }

    callSearchAPI(option) {
        return mockFetchTableData(option);
    }

    render() {
        return super.render();
    }
}

export default DemoTablePage;
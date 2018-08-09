import React from 'react';
import { Icon, Button } from 'antd';
import BasePage from './BasePage';
import PageFooter from '../../components/PageFooter';

import { mockFetchTableData } from "../../service";

class DemoFormPage extends BasePage {

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <PageFooter>
                    <Button type="primary">提交</Button>
                </PageFooter>
            </div>
        );
    }
}

export default DemoFormPage;
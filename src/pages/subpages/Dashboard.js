import React from 'react';
import BasePage from './BasePage';
import { Icon } from 'antd';

class Dashboard extends BasePage {

    componentDidMount() {
        window.test = () => {
            console.log(this.refs.form.getData());
        }
    }

    render() {
        return (
            <div>
                Dashboard Page
            </div>
        );
    }
}

export default Dashboard;
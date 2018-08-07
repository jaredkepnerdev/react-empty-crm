import React from 'react';
import BasePage from './BasePage';
import { Button } from 'antd';

class About extends BasePage {
    render() {
        return (
            <div>
                <h1>About</h1>
                <p><Button type="primary">Button</Button></p>
            </div>
        );
    }
}

export default About;
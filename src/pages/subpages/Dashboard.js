import React from 'react';
import BasePage from './BasePage';
import { Icon } from 'antd';
import { 
    Form, FormGroup, 
    TextInput, 
    Button, 
    Switch 
} from "../../components/form";

class Dashboard extends BasePage {

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <TextInput prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    </FormGroup>
                    <FormGroup>
                        <TextInput prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    </FormGroup>
                    <FormGroup>
                        <Switch value={true} />
                    </FormGroup>
                    <FormGroup>
                        <Button primary >Log in</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default Dashboard;
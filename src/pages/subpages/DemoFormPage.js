import React from 'react';
import { Icon, Button } from 'antd';
import BasePage from './BasePage';
import PageFooter from '../../components/PageFooter';
import { 
    Form, FormGroup, 
    AsyncElementWrapper,
} from "../../components/form";
import DateInput from "../../components/form/DateInput";
import TextInput from "../../components/form/TextInput";
import NumberInput from "../../components/form/NumberInput";
import Choice from "../../components/form/Choice";
import Switch from "../../components/form/Switch";
import CheckBox from "../../components/form/CheckBox";

import { Uploader, ImageUploader } from "../../components/upload";

const gs = require('../../App.scss');

class DemoFormPage extends BasePage {

    constructor(props) {
        super(props);
        this.state = {
            leftSideMenuCollapsed: false,
        };
    }

    componentDidMount() {
        this.bindData('ui.leftSideMenuCollapsed', 'leftSideMenuCollapsed');
    }

    render() {
        const { leftSideMenuCollapsed } = this.state;
        return (
            <div>
                <div className={gs.formContent}>
                    <Form ref="form" layout="inline"
                        config={{
                            username:'', password:'', name:'Jay Liang', age:24, birthday:new Date('2018-08-10'), gender:1, auto:true,
                            wants: [ 1,3 ],
                        }}
                        validation={{
                            rules:{
                                check_username: (value) => {
                                return new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve(false);
                                    }, 1000);
                                });
                                }
                            },
                            messages:{
                                check_username:'此账户名已经存在, 不允许重复'
                            }
                        }}
                        onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <AsyncElementWrapper ref={(ref) => this.usernameWrapper = ref } 
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                                name="username" required
                                                rule={[  ['length_range', 2, 18], ['check_username'] ]} 
                                                onStartValidate={(rule, value) => {
                                                    if (rule == 'check_username') {
                                                        this.usernameWrapper.showLoading();
                                                    }
                                                }}
                                                onEndValidate={(result, rule, value) => {
                                                    if (rule == 'check_username') {
                                                        this.usernameWrapper.hideLoading();
                                                    }
                                                }} >
                                <TextInput/>
                            </AsyncElementWrapper>
                        </FormGroup>
                        <FormGroup>
                            <TextInput name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        </FormGroup>
                        <FormGroup>
                            <TextInput name="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        </FormGroup>
                        <FormGroup>
                            <TextInput name="name" disabled />
                        </FormGroup>
                        <FormGroup>
                            <NumberInput name="age" min={1} max={200} step={1} />
                        </FormGroup>
                        <FormGroup>
                            <DateInput name="birthday" />
                        </FormGroup>
                        <FormGroup>
                            <Choice name="gender" options={[ { key:1, text:'男' }, { key:2, text:'女' } ]} />
                        </FormGroup>
                        <FormGroup>
                            <Switch name="auto" />
                        </FormGroup>
                        <FormGroup>
                            <CheckBox name="wants" options={[ { key:1, text:'Movie' }, { key:2, text:'Game' }, { key:3, text:'News' } ]} />
                        </FormGroup>
                        <FormGroup>
                            <Select name="type" options={[ { key:1, text:'Personal' }, { key:2, text:'Enterprise' } ]} />
                        </FormGroup>
                        <FormGroup>
                            <Uploader size={100} />
                        </FormGroup>
                        <FormGroup>
                            <ImageUploader />
                        </FormGroup>
                    </Form>
                </div>
                <PageFooter className={leftSideMenuCollapsed ? gs.pageFooterExpaned : gs.pageFooterCollapsed}>
                    <Button type="primary">提交</Button>
                </PageFooter>
            </div>
        );
    }
}

export default DemoFormPage;
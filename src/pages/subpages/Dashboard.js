import React from 'react';
import BasePage from './BasePage';
import { Icon } from 'antd';
import { 
    Form, FormGroup, 
    AsyncElementWrapper,
    TextInput, 
    NumberInput,
    Button, 
    Switch,
    Select,
    DateInput,
    Choice,
    CheckBox,
} from "../../components/form";

class Dashboard extends BasePage {

    componentDidMount() {
        window.test = () => {
            console.log(this.refs.form.getData());
        }
    }

    render() {
        return (
            <div>
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
                    {/* <FormGroup>
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
                        <Button primary >Log in</Button>
                    </FormGroup>  */}
                </Form>
            </div>
        );
    }
}

export default Dashboard;
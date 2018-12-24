import React from 'react';
import Icon from "../components/antd/Icon";
import Row from "../components/antd/Row";
import Col from "../components/antd/Col";
import { 
    Form, FormGroup, 
} from "../components/form";
import Button from "../components/form/Button";
import TextInput from "../components/form/TextInput";

const logo = require('../static/img/logo.png');

const s = require('./Login.scss');

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { history } = this.props;
        return (
            <div className={s.page}>
                <div className={s.form}>
                    <Row>
                        <Col span={12}>
                            <Form onSubmit={this.handleSubmit} className={s.formBox}>
                                <FormGroup>
                                    <TextInput prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                </FormGroup>
                                <FormGroup>
                                    <TextInput prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                </FormGroup>
                                <FormGroup size={24}>
                                    <Button primary action="submit" className={s.loginBtn}>登录</Button>
                                </FormGroup>
                                <FormGroup className={s.forgotPassword}>
                                    <a onClick={ () => history.push('#') }>忘记密码? 点此找回</a>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col span={12}>
                            <div className={s.picture}>
                                <img src={logo} />
                                <h2>THE CRM TEMPLATE</h2>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Login;
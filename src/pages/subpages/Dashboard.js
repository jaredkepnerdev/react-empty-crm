import React from 'react';
import BasePage from './BasePage';
import { Icon, Button, Row, Col } from 'antd';
import Dialog from '../../components/Dialog';

class Dashboard extends BasePage {

    componentDidMount() {
    }

    componentDidMount() {
        
    }

    showDialog1() {
        Dialog.confirm({
            title: 'Confirm',
            maskClosable: false,
            keyboard: false,
            content: 'Hello World!',
            preload: (dialog) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                        // reject('ops!');
                    }, 1000);
                });
            },
            onOk: (dialog) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                        // reject('ops!');
                    }, 1000);
                });
            }
        });
    }

    showDialog2() {
        Dialog.alert({
            title: 'Alert',
            content: 'Hello World!',
            onOk: dialog => {
                alert(dialog);
            }
        });
    }

    showDialog3() {
        Dialog.alert({
            title: 'Alert 1',
            content: 'Hello World 111'
        });
        setTimeout(() => {
            Dialog.alert({
                title: 'Alert 2',
                content: 'Hello World 222'
            });
        }, 1000);
    }

    showDialog4() {
        Dialog.show({
            title: 'Custom Dialog',
            maskClosable: false,
            keyboard: false,
            onContentRender: () => {
                return (
                    <div>
                        <h1>Hello World!</h1>
                    </div>
                );
            },
            footer: null
        });
    }

    render() {
        return (
            <div>
                <h1>Dashboard Page</h1>
                <div>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <Button onClick={ () => this.showDialog1() }>预加载异步确认对话框</Button>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Button onClick={ () => this.showDialog2() }>Alert确认框</Button>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Button onClick={ () => this.showDialog3() }>同时打开多个对话框</Button>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Button onClick={ () => this.showDialog4() }>自定义内容弹出窗</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Dashboard;
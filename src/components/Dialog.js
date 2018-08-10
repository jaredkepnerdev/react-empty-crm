import React from 'react';
import ReactDom from "react-dom";
import { Modal, Button, Spin, message } from 'antd';

const s = require('./Dialog.scss');

const createContainer = (id, container) => {
    let div = document.createElement('div');
    div.setAttribute('id', id);
    container = container || document.querySelector('body');
    container.appendChild(div);
    return div;
}

class Dialog extends React.Component {

    static show(props, onRef) {
        const id = md5(String(Date.now()) + "-" + String(Math.random() * 100000));
        const container = createContainer(id);
        let component = <Dialog ref={onRef} domContainer={container} {...props} domID={id} />;
        ReactDom.render(component, container);
        return component;
    }

    static alert(props, onRef) {
        return Dialog.show({
            ...props,
            type: 'alert',
            closable: false,
        }, onRef);
    }

    static confirm(props, onRef) {
        return Dialog.show({
            ...props,
            type: 'confirm',
            closable: false,
        }, onRef);
    }

    constructor(props) {
        super(props);
    
        this.dialogStyle = $('#dialogStyles');

        this.state = {
            visible: true,
            confirmLoading: false,
            ready: !props.preload,
            ...this.restyle(props)
        };

        if (!window.__dialogs) window.__dialogs = [];

        window.__dialogs.push(this);
    }

    closeDialog() {
        if (this.props.onClose) {
            this.props.onClose(this);
        }
        this.doRemove();
    }

    cancelDialog() {
        if (this.props.onCancel) {
            this.props.onCancel(this);
        }
        this.doRemove();
    }

    doRemove() {
        this.setState({
            visible: false
        }, () => {
            setTimeout(() => {
                this.props.domContainer.parentElement.removeChild(this.props.domContainer);
            }, 300);
        });
    }

    confirmDialog() {
        if (this.props.onOk) {
            let promise = this.props.onOk(this);
            if (promise) {
                return this.setState({ confirmLoading: true }, () => {
                    promise.then(() => {
                        this.doRemove();
                    }).catch(err => {
                        message.error(err);
                        this.setState({ confirmLoading: false });
                    });
                });
            }
        }
        this.doRemove();
    }

    restyle(props) {
        return {

        };
        let { width, className, domID } = props;
        if (width && width > 0) {
            className = className || '';
            className += ' dialog-' + domID;
            this.dialogStyle.find('#' + domID).remove();
            let style = `<style id="dialog-style-${domID}">.dialog-${domID} .ms-Dialog-main { width:${width}px; max-width:${width}px; } </style>`;
            this.dialogStyle.append(style);
        }
        return {
            className: className
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            ...this.restyle(newProps)
        });
    }

    setVisible(visible) {
        this.setState({
            visible
        });
    }

    // componentWillUnmount() {
    //     this.dialogStyle.find('#dialog-style-' + this.props.domID).remove();
    //     window.__dialogs.splice(window.__dialogs.indexOf(this), 1);

    //     if (window.__dialogs.length > 0) {
    //         let dialog = window.__dialogs[window.__dialogs.length - 1];
    //         dialog.setVisible(true);
    //     }
    // }

    componentDidMount() {
        if (this.props.preload) {
            this.props.preload(this).then((args) => {
                this.setState({ ...args, ready:true });
            }).catch(err => {
                message.error(err);
                this.doRemove();
            });
        }

        // for (let i = 0; i < window.__dialogs.length; i++) {
        //     let dialog = window.__dialogs[i];
        //     if (dialog && dialog !== this) {
        //         dialog.setVisible(false);
        //     }
        // }
    }

    generateProps() {
        let { 
            domID,
            type,
            title, 
            destroyOnClose, 
            closable, 
            keyboard, 
            maskClosable, 
            okText, 
            cancelText,
            footer,
            centered,
            bodyStyle,
            afterClose,
        } = this.props;
        let { className, visible, confirmLoading } = this.state;
        if (type) {
            if (type === 'alert') {
                footer = [
                    <Button key="ok" type="primary" onClick={ () => this.confirmDialog() }>{okText || '确定'}</Button>
                ];
            }
        }
        return {
            title,
            footer,
            centered,
            bodyStyle,
            afterClose,
            okText, 
            cancelText,
            maskClosable,
            keyboard,
            destroyOnClose,
            closable,
            confirmLoading,
            wrapClassName: className + ' dynamic-dialog',
            visible,
            onCancel: () => this.cancelDialog(),
            onOk: () => this.confirmDialog(),
            getContainer: () => {
                return document.getElementById(domID)
            }
        };
    }

    renderContent() {
        const { onContentRender, content } = this.props;
        if (onContentRender) {
            return onContentRender(this, this.props);
        } else {
            return content;
        }
    }

    render() {
        let { ready } = this.state;
        return (
            <Modal ref="modal" { ...this.generateProps() }>
            {
                !ready ? 
                <Spin size="default" className={s.spin} /> :
                (this.renderContent())
            }
          </Modal>
        );
    }
}

export default Dialog;
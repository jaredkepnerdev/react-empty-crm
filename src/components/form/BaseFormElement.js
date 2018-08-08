import React from 'react';
import { Form as AntdForm } from 'antd';
import classNames from 'classnames';

class BaseFormElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    componentWillReceiveProps(newProps) {
        // console.log(newProps);
    }

    getInjectProps() {
        const name = this.getFieldName();
        const store = this.getStore();
        const errors = store ? (store.errors || {}) : {};
        const errorMessage = errors[name] || null;
        return {
            help: errorMessage,
            validateStatus: errorMessage ? 'error' : this.props.validateStatus
        };
    }
    
    getStore() {
        return this.props.form ? this.props.form.getStore() : null;
    }
    
    getStoreValue() {
        let store = this.getStore();
        if (!store) return null;
        return store.getFieldValue(this.getFieldName());
    }

    getFieldName() {
        return this.props.name;
    }

    getInputTargetSelecor() {
        return null;
    }

    // componentWillReceiveProps(newProps) {
    //     let store = this.getStore();
    //     let value = store.getFieldValue(this.getFieldName());
    // }

    componentDidMount() {
        if (this.props.validator) {
            this.props.validator.addComponent(this, this.getInputTargetSelecor());
        }
    }
    
    componentWillUnmount() {
        this.detectHandler = null;
        if (this.props.validator) {
            this.props.validator.removeComponent(this);
        }
    }

    onDetect(handler) {
        this.detectHandler = handler;
    }

    validate(err) {
        const store = this.getStore();
        store && store.validate(this.getFieldName(), err);
    }
    
    onDetect(handler) {
        this.detectHandler = handler;
    }

    notifyChanged(value) {
        if (this.props.form) {
            this.props.form.onInputChanged(this, value);
        }
    }

    renderElement() {
        return null;
    }

    render() {
        return <AntdForm.Item 
                        className={classNames(this.props.className, 'form-item')}
                        {...this.props } {...this.getInjectProps()} 
                        name={undefined} onClick={undefined} onChange={undefined} >
                    {this.renderElement()}
                </AntdForm.Item>
    }
    
    getValue() {
        return this.getFieldName() ? this.getStoreValue() : this.state.value;
    }

    get value() {
        return this.getValue();
    }

    static isInstance(obj) {
        if (obj.type) {
            if (obj.type.prototype) {
                return obj.type.prototype instanceof BaseFormElement;
            }
        }
        return false;
    }
    
}

export default BaseFormElement;
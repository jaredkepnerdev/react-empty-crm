import React from 'react';
import ReactDom from 'react-dom';
import { Form as AntdForm, Row, Col } from 'antd';
import classNames from 'classnames';
import BaseFormElement from './BaseFormElement';
import FormStore from './FormStore';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import Select from './Select';
import Switch from './Switch';
import Choice from './Choice';
import CheckBox from './CheckBox';
import Button from './Button';
// import DateInput from './DateInput';

import AsyncElementWrapper from './AsyncElementWrapper';
import { FormValidator, Limit } from '../../utils/validator';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.store = new FormStore(this, this.props.config, this.props.validation);
        this.validator = new FormValidator(this, this.props.validation);
    }

    componentWillReceiveProps(newProps) {
        let hasChanged = false;
        if (!this.store) {
            this.store = new FormStore(this, newProps.config, newProps.validation);
            hasChanged = true;
        }
        if (!this.validator) {
            this.validator = new FormValidator(this, newProps.validation);
            hasChanged = true;
        }
        if (hasChanged) {
            //this.setState({});
        }
    }

    clear() {
        if (this.store) this.store = null;
        if (this.validator) this.validator.dispose();
        this.validator = null;
    }

    reset() {
        this.store.reset();
    }

    getStore() {
        return this.store;
    }
    
    getData() {
        const store = this.getStore();
        const data = store ? (store.data || data) : {};
        return data;
    }

    submit() {
        this.validator.check().then((result) => {
            console.log('form validation result -->', result);
            const data = this.getData();
            this.props.onSubmit && this.props.onSubmit(result, data, this);
        });
    }

    setValue(key, value) {
        const store = this.getStore();
        store && store.update(key, value);
    }

    onInputChanged(input, value, callBack) {
        //console.log(input.props.name, 'changed ---> ', value);
        const name = input.props.name;
        const store = this.getStore();
        store && store.update(name, value, callBack);
    }

    render() {
        const props = {...this.props};
        delete props['children'];
        delete props['className'];
        return (
            <AntdForm className={classNames(this.props.className, 'form')} ref="form" {...props}>
                {
                    React.Children.map(this.props.children, function(child) {
                        if (!child) return null;
                        return React.cloneElement(child, {...props, validator:this.validator, form:this });
                    }.bind(this))
                }
            </AntdForm>
        );
    }
}

class FormCell extends React.Component {
    render() {
        return (
            <div className={this.props.className || ''} onClick={this.props.onClick}
                 style={this.props.style} >
                {
                    React.Children.map(this.props.children, function(child) {
                        if (!child) return null;
                        let form = this.props.form;
                        let injectProps = { validator:this.props.validator };
                        if (form) injectProps.form = form;
                        if ((BaseFormElement.isInstance(child) || AsyncElementWrapper.isInstance(child)) && form) {
                            //inject value from store
                            let store = form.getStore();
                            if (store) {
                                let value = store.getFieldValue(child.props.name);
                                if (value != null && value != undefined) {
                                    injectProps.value = value;
                                }
                            }
                        }
                        return React.cloneElement(child, injectProps);
                    }.bind(this))
                }
            </div>
        );
    }
}

class FormGroupColumn extends React.Component {
    render() {
        let size = this.props.size;
        if (typeof size == 'number') {
            size = { sm:{ span:size }, md:{ span:size }, lg:{ span:size }, xs:{ span:size } };
        }
        size = size || {};
        return (
            <Col className={`${this.props.className || ''}`} style={this.props.style} {...size} >
                {
                    React.Children.map(this.props.children, function(child) {
                        if (!child) return null;
                        let form = this.props.form;
                        let injectProps = { validator:this.props.validator };
                        if (form) injectProps.form = form;
                        if ((BaseFormElement.isInstance(child) || AsyncElementWrapper.isInstance(child)) && form) {
                            //inject value from store
                            let store = form.getStore();
                            if (store) {
                                let value = store.getFieldValue(child.props.name);
                                if (value != null && value != undefined) {
                                    injectProps.value = value;
                                }
                            }
                        }
                        return React.cloneElement(child, injectProps);
                    }.bind(this))
                }
            </Col>
        );
    }
}

class FormGroup extends React.Component {

    render() {
        const children = this.props.children;
        const props = {...this.props};
        delete props['children'];
        delete props['style'];
        delete props['className'];

        const style = this.props.style;
        const className = 'form-group ' + (this.props.className || '');

        if (children instanceof Array) {
            if (children[0] && children[0].type == FormGroupColumn) {
                return (
                    <Row className={className} style={style}>
                        {
                            React.Children.map(this.props.children, function(child) {
                                if (!child) return null;
                                return React.cloneElement(child, { ...props, validator:props.validator, form:props.form });
                            }.bind(this))
                        }
                    </Row>
                );
            }
        }
        
        return (
            <Row className={className} style={style}>
                <FormGroupColumn {...props} size={props.size || 24}>
                    {children}
                </FormGroupColumn>
            </Row>
        );
    }
}

FormGroup.Item = AntdForm.Item;

export {
    FormStore,
    Form,
    FormGroup,
    FormGroupColumn,
    FormCell,
    AsyncElementWrapper,
    TextInput,
    NumberInput,
    Select,
    Switch,
    Choice,
    CheckBox,
    Button,
    // DateInput
};
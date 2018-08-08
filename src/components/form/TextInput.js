import React from 'react';
import BaseFormElement from './BaseFormElement';
import { Input } from 'antd';

class TextInput extends BaseFormElement {
    constructor(props) {
        super(props); 
    }

    getInputTargetSelecor() {
        return 'input';
    }

    onChange(e) {
        const value = e.target.value;
        this.notifyChanged(value);
        if (this.props.onChange) {
            this.props.onChange(value, () => {
                this.setState({
                    value: this.getValue()
                });
            });
        }
    }
    
    renderElement() {
        const { prefix, type, disabled, placeholder } = this.props;
        return (
            <Input ref="element" 
                    name={this.getFieldName()} 
                    prefix={prefix}
                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}
                    value={this.value}
                    onChange={this.onChange.bind(this)} />
        );
    }
}

export default TextInput;
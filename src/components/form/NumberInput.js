import React from 'react';
import BaseFormElement from './BaseFormElement';
import Input from '../antd/Input';

class NumberInput extends BaseFormElement {
    constructor(props) {
        super(props);
    }

    getInputTargetSelecor() {
        return 'input';
    }

    onChange(value) {
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
        const { prefix, placeholder, disabled, min, max, step } = this.props;
        return (
            <InputNumber ref="element" 
                    name={this.getFieldName()} 
                    prefix={prefix}
                    placeholder={placeholder}
                    disabled={disabled}
                    min={min}
                    max={max}
                    step={step}
                    value={this.value}
                    onChange={this.onChange.bind(this)} />
        );
    }
}

export default NumberInput;
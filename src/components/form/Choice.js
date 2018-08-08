import React from 'react';
import BaseFormElement from './BaseFormElement';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

class Choice extends BaseFormElement {
    constructor(props) {
        super(props);
    }

    getItemByKey(key) {
        const options = this.props.options || [];
        for (var i = 0; i < options.length; i++) {
            let item = options[i];
            if (item && item.key == key) return item;
        }
        return null;
    }

    onChange(e) {
        const value = e.target.value;
        this.props.onChange && this.props.onChange(value);
        this.notifyChanged(value);
        setTimeout(() => this.detectHandler && this.detectHandler(this), 0);
    }
    
    render() {
        const { options, buttonStyle, disabled } = this.props;
        return (
            <RadioGroup ref="element" 
                        disabled={disabled}
                        buttonStyle={buttonStyle}
                        name={this.getFieldName()}
                        value={this.value}
                        onChange={ this.onChange.bind(this) }>
                {
                    (options || []).map((option, index) => {
                        return <Radio key={index} value={option.key}>{option.text}</Radio>;
                    })
                }
            </RadioGroup>
        );
    }
}

export default Choice;
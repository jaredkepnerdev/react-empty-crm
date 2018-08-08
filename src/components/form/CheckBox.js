import React from 'react';
import BaseFormElement from './BaseFormElement';
import { Checkbox as AntdCheckbox } from 'antd';

class CheckBox extends BaseFormElement {
    constructor(props) {
        super(props);
    }

    onChange(selected) {
        this.props.onChanged && this.props.onChanged(selected);
        this.notifyChanged(selected);
        setTimeout(() => this.detectHandler && this.detectHandler(this), 0);
    }
    
    render() {
        const { disabled, options } = this.props;
        return (
            <AntdCheckbox.Group ref="element"
                            name={this.getFieldName()}
                            disabled={disabled}
                            value={this.value}
                            onChange={ this.onChange.bind(this) } >
                {
                    (options || []).map((option, index) => {
                        return <AntdCheckbox key={index} value={option.key}>{option.text}</AntdCheckbox>;
                    })
                }
            </AntdCheckbox.Group>
        );
    }
}

export default CheckBox;
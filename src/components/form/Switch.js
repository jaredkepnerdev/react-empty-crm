import React from 'react';
import BaseFormElement from './BaseFormElement';
import { Switch as AntdSwitch } from 'antd';

class Switch extends BaseFormElement {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            defaultChecked: this.value,
        };
    }

    onChange(checked) {
        const value = checked;
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
        return (
            <AntdSwitch ref="element" name={this.getFieldName()}
                        checked={this.value} 
                        disabled={this.props.disabled}
                        defaultChecked={this.state.defaultChecked}
                        onChange={this.onChange.bind(this) } />
        );
    }
}

export default Switch;
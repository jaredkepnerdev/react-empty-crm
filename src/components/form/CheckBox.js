import React from 'react';
import BaseFormElement from './BaseFormElement';
import { Checkbox as AntdCheckbox } from 'antd';

class CheckBox extends BaseFormElement {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.value
        });
    }

    selectionChanged(e) {
        const checked = e.target.checked;
        this.props.onChanged && this.props.onChanged(checked);
        this.onChanged(checked);
        setTimeout(() => this.detectHandler && this.detectHandler(this), 0);
    }
    
    getValue() {
        return this.state.value;
    }

    get value() {
        return this.state.value;
    }
    
    render() {
        return (
            <AntdCheckbox ref="element" {...this.props} {...this.getInjectProps()} 
                            checked={this.state.value}
                            onChange={ this.selectionChanged.bind(this) } >
                { this.props.label || this.props.text }
            </AntdCheckbox>
        );
    }
}

export default CheckBox;
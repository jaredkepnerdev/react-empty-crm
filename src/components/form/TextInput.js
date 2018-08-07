import React from 'react';
import BaseFormElement from './BaseFormElement';
import { Input } from 'antd';

class TextInput extends BaseFormElement {
    constructor(props) {
        super(props); 
        this.state = {
            value: this.getStoreValue() || ''
        };
    }

    componentWillReceiveProps(newProps) {
        let value = this.getStoreValue() || '';
        this.setState({
            value: value
        });
    }

    getInputTargetSelecor() {
        return 'input';
    }

    onChanged(value) {
        super.onChanged(this.value);
        if (this.props.onChanged) {
            this.props.onChanged(value, () => {
                this.setState({
                    value: this.getStoreValue() || ''
                });
            });
        }
    }
    
    render() {
        console.log(this.props);
        console.log(this.getInjectProps());
        return (
            <Input ref="element" value={this.state.value} {...this.props} {...this.getInjectProps()}  />
        );
    }
}

export default TextInput;
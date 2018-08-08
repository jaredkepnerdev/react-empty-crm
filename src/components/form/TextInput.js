import React from 'react';
import BaseFormElement from './BaseFormElement';
import { Input } from 'antd';

class TextInput extends BaseFormElement {
    constructor(props) {
        super(props); 
        this.state = {
            value: this.getValue()
        };
    }

    componentWillReceiveProps(newProps) {
        let value = this.getValue();
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
                    value: this.getValue()
                });
            });
        }
    }
    
    render() {
        console.log(this.element);
        return (
            <Input ref={ref => { if (ref) this.element = ref; } } {...this.props} {...this.getInjectProps()} />
        );
    }
}

export default TextInput;
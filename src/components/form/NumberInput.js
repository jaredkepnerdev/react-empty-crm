import React from 'react';
import BaseFormElement from './BaseFormElement';
import { InputNumber } from 'antd';

class NumberInput extends BaseFormElement {
    constructor(props) {
        super(props);
    }

    getInputTargetSelecor() {
        return 'input';
    }

    componentDidMount() {
        super.componentDidMount();
    }
    
    render() {
        return (
            <InputNumber ref="element" {...this.props} {...this.getInjectProps()} />
        );
    }
}

export default NumberInput;
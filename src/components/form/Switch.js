import React from 'react';
import BaseFormElement from './BaseFormElement';
import { Switch as AntdSwitch } from 'antd';

class Switch extends BaseFormElement {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <AntdSwitch ref="element" {...this.props} {...this.getInjectProps()} defaultChecked={this.props.value} />
        );
    }
}

export default Switch;
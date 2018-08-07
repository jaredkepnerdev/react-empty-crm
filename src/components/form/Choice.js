import React from 'react';
import BaseFormElement from './BaseFormElement';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

class Choice extends BaseFormElement {
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

    getItemByKey(key) {
        const options = this.props.options || [];
        for (var i = 0; i < options.length; i++) {
            let item = options[i];
            if (item && item.key == key) return item;
        }
        return null;
    }

    changeChoice(item) {
        this.props.onChanged && this.props.onChanged(item);
        this.onChanged(item.key);
        setTimeout(() => this.detectHandler && this.detectHandler(this), 0);
    }
    
    getValue() {
        return this.state.value;
    }

    get value() {
        return this.state.value;
    }
    
    render() {
        const { options } = this.props;
        return (
            <RadioGroup ref="element" {...this.props} {...this.getInjectProps()} 
                        onChange={ this.changeChoice.bind(this) }>
                {
                    (options || []).map(option => {
                        return <Radio value={opiton.key}>{option.text}</Radio>;
                    })
                }
            </RadioGroup>
        );
    }
}

export default Choice;
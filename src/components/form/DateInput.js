import React from 'react';
import moment from 'moment';
import BaseFormElement from './BaseFormElement';
import { DatePicker as AntdDatePicker } from 'antd';

class DateInput extends BaseFormElement {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || 0
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.value || 0
        });
    }

    changeDate(date) {
        this.props.onChanged && this.props.onChanged(date);
        this.onChanged(date.getTime());
        setTimeout(() => this.detectHandler && this.detectHandler(this), 0);
    }
    
    getValue() {
        return this.state.value ? this.state.value.unix() : 0;
    }

    get value() {
        return this.state.value ? this.state.value.unix() : 0;
    }
    
    render() {
        let val = this.getValue();
        return (
            <AntdDatePicker ref="element"
                      {...this.props} {...this.getInjectProps()}
                      value={val ? moment(val) : undefined}
                      format={this.props.format || 'YYYY-MM-DD'}
                      onBlur={()=>this.detectHandler && this.detectHandler(this)}
                      onChange={ this.changeDate.bind(this) }
                      />
        );
    }
}

export default DateInput;
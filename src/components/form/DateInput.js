import React from 'react';
import BaseFormElement from './BaseFormElement';
import { DatePicker as AntdDatePicker } from 'antd';

class DateInput extends BaseFormElement {
    constructor(props) {
        super(props);
    }

    onChange(date) {
        const timestamp = date.unix() * 1000;
        this.props.onChange && this.props.onChange(timestamp);
        this.notifyChanged(timestamp);
        setTimeout(() => this.detectHandler && this.detectHandler(this), 0);
    }
    
    renderElement() {
        let val = this.getValue();
        return (
            <AntdDatePicker ref="element"
                      {...this.props} {...this.getInjectProps()}
                      value={val ? moment(val) : undefined}
                      format={this.props.format || 'YYYY-MM-DD'}
                      disabled={this.props.disabled}
                      mode={this.props.mode}
                      showTime={this.props.showTime}
                      onChange={ this.onChange.bind(this) }
                      />
        );
    }
}

export default DateInput;
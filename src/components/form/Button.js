import React from 'react';
import { Button as AntdButton } from 'antd';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const primary = this.props.hasOwnProperty('primary') ? this.props.primary : true;
        const dashed = this.props.hasOwnProperty('dashed') ? this.props.dashed : true;
        const danger = this.props.hasOwnProperty('danger') ? this.props.danger : true;
        let type = 'default';
        if (primary) type = 'primary';
        else if (dashed) type = 'dashed';
        else if (danger) type = 'danger';
        const props = { ...this.props };
        delete props['primary'];
        delete props['dashed'];
        delete props['danger'];

        const onClick = () => {
            if (this.props.action === 'submit') {
                if (this.props.form) {
                    this.props.form.submit();
                }
            } else {
                this.props.onClick && this.props.onClick();
            }
        };
        return <AntdButton {...props} type={type} onClick={onClick}>{this.props.children}</AntdButton>;
    }
}

export default Button;
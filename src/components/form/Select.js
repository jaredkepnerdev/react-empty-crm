import React from 'react';
import BaseFormElement from './BaseFormElement';
import { Menu, Dropdown, Button, Icon } from 'antd';

class Select extends BaseFormElement {
    constructor(props) {
        super(props);
        const option = this.value ? this.getItemByKey(this.value) : null;
        this.state = {
            ...this.state,
            selectedOption: option
        };
    }

    renderMenu() {
        const { options } = this.props;
        return (
            <Menu onClick={this.onChange.bind(this)}>
            {
                (options || []).map((option, index) => {
                    return <Menu.Item key={index}>
                                { option.icon ? <Icon type={option.icon} /> : null }
                                {option.text}
                            </Menu.Item>;
                })
            }
            </Menu>
        );
    }

    getItemByKey(key) {
        const options = this.props.options || [];
        for (var i = 0; i < options.length; i++) {
            let item = options[i];
            if (item && item.key == key) return item;
        }
        return null;
    }

    onChange(e) {
        const option = (this.props.options || [])[Number(e.key)];
        this.notifyChanged(option.key);
        if (this.props.onChange) {
            this.props.onChange(option.value, () => {
                this.setState({
                    selectedOption: option
                });
            });
        } else {
            this.setState({
                selectedOption: option
            });
        }
    }
    
    renderElement() {
        const { selectedOption } = this.state;
        return (
            <Dropdown ref="element" name={this.getFieldName()}
                      overlay={this.renderMenu()} 
                      disabled={this.props.disabled} >
                <Button style={{ marginLeft: 8 }}>
                    {
                        selectedOption ? 
                        <span>
                            { selectedOption.icon ? <Icon type={selectedOption.icon} /> : null } {selectedOption.text}
                        </span> : 
                        ''
                    } <Icon type="down" />
                </Button>
            </Dropdown>
        );
    }
}

export default Select;
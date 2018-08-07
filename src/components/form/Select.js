import React from 'react';
import BaseFormElement from './BaseFormElement';
import { Menu, Dropdown, Button, Icon } from 'antd';

class Select extends BaseFormElement {
    constructor(props) {
        super(props);        

        this.state = {
            value: props.value || this.props.defaultValue
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.value
        });
    }

    renderMenu() {
        const { options } = this.props;
        return (
            <Menu onClick={handleMenuClick}>
            {
                (options || []).map(option => {
                    return <Menu.Item key={option.key}>
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

    changeSelection(item) {
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
        const { value } = this.state;
        let selectedOption;
        if (value != null && value != undefined) {
            selectedOption = this.getItemByKey(value);
        }
        return (
            <Dropdown ref="element" {...this.props} {...this.getInjectProps()}
                      overlay={this.renderMenu()}
                      onChange={ this.changeSelection.bind(this) } >
                <Button style={{ marginLeft: 8 }}>
                    {
                        selectedOption ? 
                        <div>
                            { selectedOption.icon ? <Icon type={selectedOption.icon} /> : null } {selectedOption.text}
                        </div> : 
                        ''
                    } <Icon type="down" />
                </Button>
            </Dropdown>
        );
    }
}

export default Select;
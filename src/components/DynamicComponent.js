import React from 'react';
import ReactDom from 'react-dom';

class DynamicComponent extends React.Component {

    static show = (Component, id, props, container, onRef) => {
        let div = document.createElement('div');
        div.setAttribute('id', id);
        container = container || document.querySelector('body');
        let component = <Component ref={onRef} hidden={false} domContainer={container} {...props} domID={id} />;
        ReactDom.render(component, div);
        let dom = container.appendChild(div);
        return component;
    }

    constructor(props) {
        super(props);
        this.state = {
            hidden: props.hidden ? true : false
        };
    }

    doRemove() {
        if (this.removed) return;
        this.removed = true;
        this.setState({ hidden:true });
        let check = () => {
            window['Timer_' + this.props.domID] = setTimeout(() => {
                let ele = document.getElementById(this.props.domID);
                if (ele) {
                    ReactDom.unmountComponentAtNode(ele);
                    this.props.domContainer.removeChild(ele);
                    window['Timer_' + this.props.domID] = undefined;
                } else {
                    check();
                }
            }, 300);
        }
        check();
    }
}

export default DynamicComponent;

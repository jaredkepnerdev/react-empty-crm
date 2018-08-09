import * as React from 'react'; 
import EasyReact from '../utils/easy-react';
import { Layout, Icon } from 'antd'
const { Header } = Layout;

const s = require('./AppHeader.scss');

class AppHeader extends EasyReact.Component {

    constructor(props) {
        super(props);
        this.state = {
            leftSideMenuCollapsed: false,
        };
    }

    componentDidMount() {
        this.bindData('ui.leftSideMenuCollapsed', 'leftSideMenuCollapsed');
    }

    render() {
        const { leftSideMenuCollapsed } = this.state;
        return (
            <Header className={s.header}>
                <Icon
                    className={s.siderToggle}
                    type={leftSideMenuCollapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={() => {
                        this.exec('ui.leftSideMenuCollapse', !leftSideMenuCollapsed);
                    }}
                    />
            </Header>
        );
    }
}

export default AppHeader;
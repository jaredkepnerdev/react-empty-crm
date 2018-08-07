import * as React from 'react'; 
import { Layout, Icon } from 'antd'
const { Header } = Layout;

const s = require('./AppHeader.scss');

class AppHeader extends React.Component {
    render() {
        return (
            <Header className={s.header}>
                <Icon
                    className={s.siderToggle}
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                    />
            </Header>
        );
    }
}

export default AppHeader;
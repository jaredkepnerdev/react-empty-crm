import React from 'react';
import { Layout } from 'antd';
import LeftSide from '../components/LeftSide';
import AppHeader from '../components/AppHeader';
import ContentContainer from '../components/ContentContainer';

const s = require('../App.scss');

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            role: null,
            menu: null,
            err: false,
            collapsed: false,
        };
    }

    componentDidMount() {
        this.setState({
            role: Model.getUserRole(),
            menu: Model.getMenus()
        });
    }
    
    componentWillUnmount() {
        super.componentWillUnmount();
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { role, menu, err, collapsed } = this.state;
        if (!role || !menu) return null;

        if (err) return <h1>服务器发生了一些错误，请刷新页面重试。</h1>;

        return (
            <Layout className={s.page}>
                <LeftSide role={role} menu={menu} collapsed={collapsed} {...this.props} />
                <Layout>
                    <AppHeader role={role} collapsed={collapsed} {...this.props} toggle={this.toggle.bind(this)} />
                    <ContentContainer role={role} {...this.props} url={window.location.pathname} />
                </Layout>
            </Layout>
        );
    }
}

export default Home;
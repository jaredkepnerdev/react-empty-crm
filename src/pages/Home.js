import React from 'react';
import { Layout } from 'antd';
import EasyReact from '../utils/easy-react';
import LeftSide from '../components/LeftSide';
import AppHeader from '../components/AppHeader';
import ContentContainer from '../components/ContentContainer';

const s = require('../App.scss');

class Home extends EasyReact.Component {

    constructor(props) {
        super(props);
        this.state = { 
            role: null,
            menu: null,
            err: false,
            leftSideMenuCollapsed: false,
        };
    }

    componentDidMount() {
        this.setState({
            role: Model.getUserRole(),
            menu: Model.getMenus()
        }, () => {
            this.bindData('ui.leftSideMenuCollapsed', 'leftSideMenuCollapsed');
        });
    }
    
    componentWillUnmount() {
        super.componentWillUnmount();
    }

    render() {
        const { role, menu, err, leftSideMenuCollapsed } = this.state;
        if (!role || !menu) return null;

        if (err) return <h1>服务器发生了一些错误，请刷新页面重试。</h1>;

        return (
            <Layout className={s.page}>
                <LeftSide role={role} menu={menu} {...this.props} />
                <Layout className={leftSideMenuCollapsed ? s.contentCollapsed : s.content}>
                    <AppHeader role={role} {...this.props} />
                    <ContentContainer role={role} {...this.props} url={window.location.pathname} />
                </Layout>
            </Layout>
        );
    }
}

export default Home;
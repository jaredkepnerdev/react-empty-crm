import React from "react";
import EasyReact from '../utils/easy-react';
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout;

const s = require('./LeftSide.scss');

class LeftSide extends EasyReact.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: props.page,
            role: props.role,
            collapsed: false,
        };

        let menuHash = {};
        let linkNames = {};
        props.menu.forEach(link1 => {
            linkNames[link1.key] = link1.name;
            menuHash[link1.key] = link1;
            link1.links && link1.links.forEach(link2 => {
                linkNames[link2.key] = link2.name;
                menuHash[link2.key] = link2;
                if (link2.contains) {
                    for (let key2 in link2.contains) {
                        menuHash[key2] = link2.contains[key2];
                        linkNames[key2] = link2.contains[key2];
                    }
                }

                link2.links && link2.links.forEach(link3 => {
                    linkNames[link3.key] = link3.name;
                    menuHash[link3.key] = link3;
                    if (link3.contains) {
                        for (let key3 in link3.contains) {
                            menuHash[key3] = link3.contains[key3];
                            linkNames[key3] = link3.contains[key3];
                        }
                    }
                });
            });
            if (link1.contains) {
                for (let key in link1.contains) {
                    menuHash[key] = link1.contains[key];
                    linkNames[key] = link1.contains[key];
                }
            }
        });
        this.linkNames = linkNames;
        this.menuHash = menuHash;

        this.menus = [
            {
                links:props.menu
            }
        ];

        this._onLinkClick = this.onLinkClick.bind(this);
    }

    componentDidMount() {
        this.bindData('ui.leftSideMenuCollapsed', 'collapsed');
    }

    onLinkClick(key) {
        let navItem = this.menuHash[key];
        if (navItem.key.charAt(0) === '#') {
            navItem.isExpanded = !navItem.isExpanded;
            this.justExpand = true;
            this.setState({});
        } else {
            this.props.history.push(navItem.key);
        }
    }

    expendSelectedNav() {
        let current = window.location.pathname;
        window.currentPageNav = [];
        if (this.menuHash[current]) {
            window.currentPageNav = [ this.menuHash[current] ];
        }
        let menus = this.menus[0].links;

        for (let i = 0; i < menus.length; i++) {
            let menu = menus[i];
            menu.isExpanded = menu.key == current;
            
            if (menu.isExpanded) return this.selectedFirstMenu = menu;

            for (let key in menu.contains) {
                if (current === key) {
                    window.currentPageNav = [ menu, menu.contains[key] ];
                    menu.isExpanded = true;
                    return;
                }
            }

            if (!menu.links || menu.links.length < 1) continue;

            for (let j = 0; j < menu.links.length; j++) {
                let subMenu = menu.links[j];

                if (subMenu.key == current) {
                    menu.isExpanded = true;
                }
                
                if (menu.isExpanded && window.currentPageNav.indexOf(menu) < 0) {
                    window.currentPageNav = [ menu, subMenu ];
                }
            
                if (menu.isExpanded) return this.selectedFirstMenu = menu;

                for (let key in subMenu.contains) {
                    if (current === key) {
                        window.currentPageNav = [ menu, subMenu, subMenu.contains[key] ];
                        menu.isExpanded = true;
                        this.selectedFirstMenu = menu;
                        return;
                    }
                }

                if (!subMenu.links || subMenu.links.length < 1) continue;

                for (let k = 0; k < subMenu.links.length; k++) {
                    let subSubMenu = subMenu.links[k];
                    if (subSubMenu.key == current) {
                        menu.isExpanded = true;
                    }
                    if (subSubMenu.contains && subSubMenu.contains[current]) {
                        menu.isExpanded = true;
                    }
                    if (subMenu.contains && subMenu.contains[current]) {
                        menu.isExpanded = true;
                    }
                    if (menu.isExpanded && window.currentPageNav.indexOf(subMenu) < 0) {
                        window.currentPageNav = [ menu, subMenu, subSubMenu ];
                    }
            
                    if (menu.isExpanded) return this.selectedFirstMenu = menu;
                }
            }
        }
    }
    
   render() {
       const { collapsed } = this.state;
        let current = window.location.pathname;
        if (this.linkNames[current]) {
            window.currentPageName = this.linkNames[current];
        }
        this.expendSelectedNav();
       return (
            <Sider className={s.sider}
                    trigger={null}
                    collapsible
                    collapsed={collapsed} >
                <div className={s.logo} />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1">
                    <Icon type="user" />
                    <span className="nav-text">nav 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                    <Icon type="video-camera" />
                    <span className="nav-text">nav 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                    <Icon type="upload" />
                    <span className="nav-text">nav 3</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                    <Icon type="bar-chart" />
                    <span className="nav-text">nav 4</span>
                    </Menu.Item>
                    <Menu.Item key="5">
                    <Icon type="cloud-o" />
                    <span className="nav-text">nav 5</span>
                    </Menu.Item>
                    <Menu.Item key="6">
                    <Icon type="appstore-o" />
                    <span className="nav-text">nav 6</span>
                    </Menu.Item>
                    <Menu.Item key="7">
                    <Icon type="team" />
                    <span className="nav-text">nav 7</span>
                    </Menu.Item>
                    <Menu.Item key="8">
                    <Icon type="shop" />
                    <span className="nav-text">nav 8</span>
                    </Menu.Item>
                </Menu>
            </Sider>
       );
   }
}

export default LeftSide;
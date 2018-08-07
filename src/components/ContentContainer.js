import React from 'react'; 
import { Layout } from 'antd'
const { Content } = Layout;
import { router as pageRouter, NotFound } from '../pages';
import PageError from '../pages/subpages/PageError';

import Loadable from 'react-loadable';

import HtmlHelper from '../utils/html';

const s = require('./ContentContainer.scss');

class PagePlaceHolder extends React.Component {
    render() {
        if (this.props.pastDelay && this.props.isLoading) {
            return <div>Loading...</div>;
        }
        return null;
    }
}

const generateAsyncPage = (page, callBack) => {
    return Loadable({
        loader: () => {
            return new Promise((resolve, reject) => {
                setTimeout((mod) => {
                    page.then(async (mod) => {
                        if (mod.default.preload) {
                            try {
                                await mod.default.preload();
                            } catch (err) {
                                mod = PageError;
                                mod.errorMessage = err.message;
                            }
                        }
                        resolve(mod);
                        callBack && setTimeout(callBack, 0);
                    }).catch(err => {
                        let mod = PageError;
                        mod.errorMessage = err.message;
                        resolve(mod);
                        callBack && setTimeout(callBack, 0);
                    });
                }, 0);
            });
        },
        loading: PagePlaceHolder
    });
}

class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isContainerReady: false,
            pageNav: []
        };
        this._onLinkClick = this.onLinkClick.bind(this);
        PageError.retry = this.retryRenderContent.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.headerLeft = null;
        this.setState({
            pageNav: window.currentPageNav
        });
    }

    componentDidMount() {
        
    }

    retryRenderContent() {
        this.content = null;
        this.contcurrentUrlent = null;
        this.setState({  }, () => {
            this.startRender();
        })
    }

    renderContent() {
        if (!this.state.isContainerReady) return null;
        if (this.content && this.currentUrl === this.props.url) return this.content;
        // if (!PageMap.checkIsSubPage(this.props.url)) return null;
        let module = pageRouter(this.props.url);
        if (!module) {
            //redirect to 404 page
            console.log('page not found: ', this.props.url);
            module = NotFound();
        }
        console.log('render content ---> ' + this.props.url);
        const Page = generateAsyncPage(module);
        this.currentUrl = this.props.url;
        this.content = <Page history={this.props.history} contentContainer={this} />;
        return this.content;
    }

    renderHeaderLeft(ele) {
        this.headerLeft = ele;
        this.setState({});
    }

    startRender() {
        if (this.state.isContainerReady) return;
        var ins = this;
        setTimeout(() => {
            ins.setState({ isContainerReady:true, pageNav:window.currentPageNav });
        }, 0);
    }

    onLinkClick(item) {
        this.props.history.push(item.key);
    }

    render() {
        return (
            <Content className={s.contentContainer} ref={this.startRender.bind(this)} >
                <div className={s.wrapper}>
                    { this.renderContent() }
                </div>
            </Content>
        );
    }
}

export default ContentContainer;
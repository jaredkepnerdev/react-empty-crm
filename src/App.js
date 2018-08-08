import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { init as pageMapInit, Home, Login, About, NotFound, NoPermission, SubPages, checkIsWhitelist } from './pages';
import AuthRoute from './components/AuthRoute';
import Model from './model/Model';
import FullPageLoading from './components/FullPageLoading';

import './App.scss';

global.__defineGetter__('Model', function () {
    return Model;
});

class PagePlaceHolder extends React.Component {
    render() {
        if (this.props.error == -1) {
            //no permission
            console.log('no permission...')
            return <Redirect to={'/login'}/>;
        }
        return <FullPageLoading />;
    }
}

class RootApp extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = { inited:false };
    }

    async componentDidMount() {
        pageMapInit("default");
        try {
            await Model.init();
            const user = Model.user;
            this.setState({
                inited: true,
                isLogined: user ? user.isLogined : false,
                role: user ? user.JS : null
            });
        } catch (err) {
            this.setState({
                inited: true,
                isLogined: false,
                role: null
            });
        }
    }

    generateAsyncPage(page, pathname) {
        let load = () => {
            return new Promise(async (resolve, reject) => {
                pathname = pathname || window.location.pathname;
                if (!checkIsWhitelist(pathname)) {
                    //1. check page permission
                    // var allow = false;
                    // try {
                    //     let result = await callAPI('permission.checkPage', { page:pathname });
                    //     allow = result.allow ? true : false;
                    // } catch (err) {
                    //     console.error(err);
                    //     allow = false;
                    // }
                    let allow = true;
                    console.log('page \'' + pathname + '\' access: ' + (allow ? 'allow' : 'deny'));
                    if (!allow) return reject(-1);
                }
                
                //2. load module
                try {
                    let mod = await page();
                    if (mod.default.preload) {
                        await mod.default.preload();
                    }
                    resolve(mod);
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            });
        };
        return class AsyncPage extends React.Component {
            constructor(props) {
                super(props);
                this.state = {};
            }

            componentDidMount() {
                this.setState({
                    loaded: undefined,
                    error: undefined
                }, () => {
                    load().then(mod => {
                        setTimeout(() => {
                            this.setState({
                                loaded: mod.default,
                                error: undefined
                            });
                        }, 0);
                    }).catch(err => {
                        this.setState({
                            loaded: undefined,
                            error: err
                        });
                    });
                });
            }

            render() {
                const { loaded, error } = this.state;
                if (!loaded) return <PagePlaceHolder {...this.props} error={error} />;
                let Comp = loaded;
                return <Comp {...this.props} />;
            }
        }
    }

    render() {
        const { inited, role, isLogined } = this.state;
        if (!inited) return null;
        console.log('update router ----> isLogined: ' + isLogined);
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={()=><Redirect to={'/dashboard'} />} />
                    <Route path="/login" component={this.generateAsyncPage(Login, '/login')} />
                    <Route path="/about" component={this.generateAsyncPage(About, '/about')} />
                    <Route path="/404" component={this.generateAsyncPage(NotFound, '/404')} />
                    <Route path="/no_permission" component={this.generateAsyncPage(NoPermission, '/no_permission')} />
                    {
                        isLogined ? SubPages.map((path) => {
                            return <AuthRoute role={role} key={path} path={'/*'} component={this.generateAsyncPage(Home)} />;
                        }) : <Route path={'/*'}
                                render={() => {
                                        return <Redirect to={'/login'} />;
                                    }
                                }
                            />
                    }
                </Switch>
            </Router>
        );
    }
}

export default RootApp;
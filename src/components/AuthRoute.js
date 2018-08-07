import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { callAPI } from '../utils/service';

class AuthRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    goNext(target) {
        if (typeof target == 'string') return () => { return <Redirect to={target} /> };
        return target;
    }

    render() {
        const failRedirect = {
            pathname: this.props.login || '/login',
            state: { from: this.props.location }
        };
        if (Model.user.isLogined) {
            return (
                <Route {...this.props} component={this.props.component}/>
            );
        }

        return <Redirect to={failRedirect}/>;
    }
}

export default AuthRoute;
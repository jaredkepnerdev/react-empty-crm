import React from 'react';
import BasePage from './BasePage';

class NoPermission extends BasePage {
    render() {
        return (
            <div style={{ padding:'0 20px' }}>
                <p className="ms-font-su">Access Denied.</p>
                <p className="ms-font-xl">It looks like you don't have no permission to access this page. </p>
                <p>
                    <a onClick={() => this.goPage('/index')}>go back index</a>
                    <a onClick={() => this.goPage('/login')} style={{ marginLeft:30 }}>switch account</a>
                </p>
            </div>
        );
    }
}

export default NoPermission;
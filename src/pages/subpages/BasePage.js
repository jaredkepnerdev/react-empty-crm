import React from 'react';

export default class BasePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {

    }

    readLinkParams() {
        let params = window.parseUrlQueryString();
        for (let key in params) {
            let val = decodeURIComponent(params[key]);

            if (!isNaN(Number(val))) {
                val = Number(val);
            }
            if (typeof val === 'string') {
                try {
                    val = JSON.parse(val);
                } catch (err) {
                    val = String(params[key]);
                }
            }

            params[key] = val;
        }
        return params;
    }

    updatePageLink(params, state) {
        let url = window.location.pathname + `?__t=${Date.now()}`;
        for (let key in params) {
            let val = params[key];
            if (val && val === 'object') {
                val = JSON.stringify(val);
            }
            if (typeof val === 'string') {
                val = encodeURIComponent(val);
            }
            url += `&${key}=${val}`;
        }
        this.props.history.replace(url);
        this.setState({ ...state });
    }

    render() {
        return null;
    }
}
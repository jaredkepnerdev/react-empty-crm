import React from 'react'; 

class BasePage extends React.Component {
    constructor(props) {
        super(props);

        //window.onpopstate = this.onBackButtonEvent.bind(this);
    }

    isGoPageAvailable() {
        return this.props.goPage || this.props.history;
    }

    goPage(url) {
        if (this.props.goPage) {
            this.props.goPage(url);
        } else if (this.props.history) {
            this.props.history.push(url);
        }
    }

    goBack() {
        if (this.props.history) {
            this.props.history.goBack();
        }
    }

    onBackButtonEvent(e) {
        e.preventDefault();
        if (this.isGoPageAvailable()) {
            this.goBack();
        }
    }
}

export default BasePage;
import React from 'react';

class AsyncElementWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.show ? true : false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loading: nextProps.show ? true : false
        });
    }

    showLoading() {
        this.setState({ loading:true });
    }
    
    hideLoading() {
        this.setState({ loading:false });
    }
    
    render() {
        var withLabel = false;
        const props = {...this.props};
        delete props['children'];
        delete props['ref'];
        return (
            <div style={{ position:'relative' }}>
                {
                    React.Children.map(this.props.children, function(child) {
                        if (!child) return null;
                        if (props.label) withLabel = true;
                        return this.state.loading ? React.cloneElement(child, {...props, hasFeedback:true, validateStatus:'validating' }) : React.cloneElement(child, {...props });
                    }.bind(this))
                }
                {/* {
                    this.state.loading ? 
                    <Spin indicator={<Icon type="loading" style={{ fontSize: 16 }} spin />} /> : 
                    null
                } */}
            </div>
        );
    }
    
    static isInstance(obj) {
        if (obj.type) {
            return obj.type.name == 'AsyncElementWrapper';
        }
        return false;
    }
}

export default AsyncElementWrapper;
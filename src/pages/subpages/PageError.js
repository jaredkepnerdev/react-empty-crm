import React from 'react';
import { Button } from 'antd';

class PageError extends React.Component {

    static errorMessage = '未知错误.';

    static retry = null;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ marginTop:'10%', textAlign:'center' }}>
                <p>无法加载页面, 服务器似乎发生了一些错误.</p>
                <p>错误信息: {PageError.errorMessage}</p>
                <p style={{ marginTop:40 }}>
                    <Button className="light" onClick={()=> PageError.retry && PageError.retry()} >重新加载</Button>
                </p>
            </div>
        );
    }
}

export default PageError;
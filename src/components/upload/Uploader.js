import React from "react";
import { Button, Upload, message, Icon } from 'antd';
import * as utils from './utils';

class Uploader extends React.Component {
    state = { };

    beforeUpload(file, supportTypes, maxSize) {
        return utils.beforeUpload(file, supportTypes, maxSize, (err) => message.error(err));
    }

    renderChildren() {
        return (
            <Button>
                <Icon type="upload" /> {this.props.label || '点击上传'}
            </Button>
        );
    }

    render() {
        let { className, types, maxSize, mode, showUploadList } = this.props;
        maxSize = maxSize || 2;
        types = types || this.state.types;
        showUploadList = showUploadList || this.state.showUploadList;
        if (typeof types === 'string') {
            types = utils['TYPE_' + types.toUpperCase()];
        }
        return (
            <Upload
                name="avatar"
                listType={mode || this.state.mode}
                className={className}
                showUploadList={showUploadList}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={(file) => {
                    return this.beforeUpload(file, types, maxSize);
                }}
                onChange={this.handleChange}
            >
                { this.renderChildren() }
            </Upload>
        );
    }
}

export default Uploader;
import React from "react";
import { Icon } from 'antd';
import { getBase64 } from './utils';
import Uploader from './Uploader';

class ImageUploader extends Uploader {
    state = {
        types: 'static_image',
        mode: 'picture-card',
        showUploadList: false,
        loading: false,
    };

    loadPreview(file, callback) {
        return getBase64(file, callback);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.loadPreview(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    renderChildren() {
        let { imageUrl, loading, width, height, size } = this.state;
        size = size || 86;
        let { label } = this.props;
        const uploadButton = (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">{label || 'Upload'}</div>
            </div>
        );
        if (imageUrl) {
            return <div style={{ 
                        background: `url(${imageUrl}) center center no-repeat`, 
                        backgroundSize: 'contain', 
                        width: width || size, 
                        height: height || size }} 
                        alt="preview" />;
        }
        return uploadButton;
    }
}

export default ImageUploader;
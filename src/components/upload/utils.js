
export const TYPE_STATIC_IMAGE = ['image/png', 'image/jpeg', 'image/bmp' ];

export const TYPE_ALL_IMAGE = TYPE_STATIC_IMAGE.concat(['image/gif' ]);

export const TYPE_DOC = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/msword', 
    'application/pdf', 
    'application/vnd.ms-excel', 
    'text/plain', 
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
    'application/vnd.ms-powerpoint',
    'text/xml'
];

export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    const handler = () => {
        reader.removeEventListener('load', handler);
        callback && callback(reader.result);
    };
    reader.addEventListener('load', handler);
    reader.readAsDataURL(img);
}

export const beforeUpload = (file, supportTypes, maxSize, onError) => {
    if (supportTypes) {
        const isSupport = supportTypes.indexOf(file.type) >= 0;
        if (!isSupport) {
            onError && onError('不支持该文件类型上传.');
            return false;
        }
    }
    if (maxSize) {
        const isLt2M = file.size / 1024 / 1024 < maxSize;
        if (!isLt2M) {
            onError && onError(`上传文件大小不能超过 ${maxSize}MB.`);
            return false;
        }
    }
    return true;
}

const fs = require('fs');
const path = require('path');

const APP_ROOT = path.join(__dirname, '../');
const SRC_PATH = APP_ROOT + '/src';
const SRC_STATIC_PATH = SRC_PATH + '/static';
const DIST_PATH = APP_ROOT + '/dist';
const DIST_STATIC_PATH = DIST_PATH + '/static';

module.exports = {
    paths: {
        root: APP_ROOT,
        src: SRC_PATH,
        src_static: SRC_STATIC_PATH,
        dist: DIST_PATH,
        dist_static: DIST_STATIC_PATH
    },
    dev: {
        port: 9090,
        server: '127.0.0.1'
    }
}
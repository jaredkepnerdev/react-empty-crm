
global.ENV = 'test';

const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const consts = require('./consts');

const CDN = 'http://pbcdn.ugeez.cn/SPRT/test_2018_05_01/webapp/[CDN_VER]';

// common.entry.vendor.push(path.resolve(consts.paths.src_static, `config/${global.ENV}/setting.js`));

module.exports = merge(common, {
    stats: "errors-only",
    // devtool:'eval',
    entry: {
        // config: [
        //     path.resolve(consts.paths.src_static, `config/${global.ENV}/setting.js`)
        // ],
        app: [
            'babel-polyfill',
            path.join(consts.paths.src, 'main.js'),   //entry file
        ]
    },
    output:{
        publicPath: CDN + '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new CleanWebpackPlugin([
            consts.paths.dist + '/**/*'
        ], {
            verbose: true,
            dry: false,
            allowExternal: true
        }),
        new CopyWebpackPlugin([
            { context: path.join(consts.paths.src_static, '/config/'), from: path.join(consts.paths.src_static, '/config/*.*'), to: 'static/config' },
            { from: path.join(consts.paths.src_static, `config/${global.ENV}/setting.js`), to: `static/config/${global.ENV}` },
            // { from: path.join(consts.paths.src_static, '/html'), to: 'static/html' },
            { from: path.join(consts.paths.src_static, '/js/'), to: 'static/js' },
            // { from: path.join(consts.paths.src_static, '/img/'), to: 'static/img' },
            { context: path.join(consts.paths.src_static, '/styles/'), from: path.join(consts.paths.src_static, '/styles/**/*.css'), to: 'static/styles' }
        ]),
        new ReplaceInFileWebpackPlugin([
            {
                dir: consts.paths.dist,
                files: ['index.html'],
                rules: [{
                    search: /"\/static/img,
                    replace: '"' + CDN + '/static'
                }]
            },
            {
                dir: consts.paths.dist,
                test: /config\..*\.js/,
                rules: [{
                    search: /@cdn/img,
                    replace: CDN
                }]
            },
            {
                dir: consts.paths.dist,
                files: [`static/config/${global.ENV}/setting.js`],
                rules: [{
                    search: /@cdn/img,
                    replace: CDN
                }]
            },
            //url(/static/
            {
                dir: consts.paths.dist,
                test: /.*\.js/,
                rules: [
                    {
                        search: /url\("?\/?static\//img,
                        replace: 'url(' + CDN + '/static/'
                    }
                ]
            }
        ]),
        new UglifyJSPlugin({
            uglifyOptions: {
              compress: {
                drop_console: true,
              }
            }
          })
    ]
});
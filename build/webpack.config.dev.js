global.ENV = 'localdev';

const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const consts = require('./consts');

// common.entry.vendor.push(path.resolve(consts.paths.src_static, 'config/localdev/setting.js'));

module.exports = merge(common, {
    entry: {
        // config: [
        //     path.resolve(consts.paths.src_static, 'config/localdev/setting.js')
        // ],
        app: [
            'babel-polyfill',
            'webpack-dev-server/client?http://localhost:9090/',   //hot reload
            path.join(consts.paths.src, 'main.js'),   //entry file
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        port: 9090,
        contentBase: consts.paths.src,
        hot: true,
        historyApiFallback: true,
        stats: {
            ...common.stats,
            warnings: true
        }
    }
});
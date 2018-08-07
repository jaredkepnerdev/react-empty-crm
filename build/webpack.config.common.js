
const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const consts = require('./consts');

module.exports = {
    entry: {
        vendor: [
            'babel-polyfill', 'react', 'react-loadable', 'react-router-dom', 
            'number-precision', 
            'lodash/get', 'lodash/set', 'lodash/groupBy', 'lodash/orderBy', 'lodash/remove', 
            path.resolve(consts.paths.src, 'components/DynamicComponent'),
            path.resolve(consts.paths.src, 'utils/service'),
        ] 
    },
    resolve: {
        extensions: [".jsx", ".react.jsx", ".json", ".js", ".css", ".less", ".scss"],
    },
    output: {
        path: consts.paths.dist, //output folder
        filename: '[name].[hash].bundle.js', //packaged bundle file
        chunkFilename: '[name].[hash].chunk.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2017', 'react', 'stage-2'],
                    plugins: [
                        [ 'import', { libraryName:'antd', libraryDirectory: "es", style: "css" } ]
                    ]
                }
            },
            // styles
            {
                test: /\.less$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],
                // exclude: /node_modules/,
                include: [
                    path.resolve(consts.paths.src, ''),
                    path.resolve(consts.paths.root, 'node_modules/antd')
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    require.resolve('style-loader'),
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        module: true,
                        // so that it's somewhat readable in development
                        // it outputs it as filename_selector_hash
                        localIdentName: '[name]__[local]__[hash:base64:5]',
                      },
                    },
                    {
                      loader: require.resolve('sass-loader'),
                    },
                  ],
                // exclude: /node_modules/,
                include: [
                    path.resolve(consts.paths.src, ''),
                    path.resolve(consts.paths.root, 'node_modules/antd')
                ]
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style-loader!css-loader',
                // exclude: /node_modules/,
                include: [
                  path.resolve(consts.paths.root, 'node_modules/antd')
                ]
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loaders: [
                  'file?hash=sha512&digest=hex&name=images/[name].[ext]',
                  'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
              ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'CRM-Template-React',
            env: global.ENV,
            inject: 'body',
            hash: true,
            historyApiFallback: true,
            template: path.join(consts.paths.src, 'index.html')
        })
    ],
    stats: {
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: false,
        publicPath: false
    }
};
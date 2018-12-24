
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
            path.resolve(consts.paths.src, 'components/antd/Icon'), 
            path.resolve(consts.paths.src, 'components/antd/Row'), 
            path.resolve(consts.paths.src, 'components/antd/Col'),
            path.resolve(consts.paths.src, 'components/antd/Form'),
            path.resolve(consts.paths.src, 'components/DynamicComponent'),
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
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: [
                        ['import', { libraryName: 'antd', libraryDirectory: "es", style: "css" }],
                        '@babel/syntax-dynamic-import',
                        '@babel/plugin-proposal-class-properties'
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
                            url: false,
                            importLoaders: 1,
                            module: true,
                            // so that it's somewhat readable in development
                            // it outputs it as filename_selector_hash
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                        },
                    },
                    {
                        loader: require.resolve('sass-loader'),
                    }
                ],
                // exclude: /node_modules/,
                include: [
                    path.resolve(consts.paths.src, ''),
                    path.resolve(consts.paths.root, 'node_modules/antd')
                ]
            },
            {
                test: /\.css$/, // Only .css files
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                        }
                    }
                ],
                // exclude: /node_modules/,
                include: [
                    path.resolve(consts.paths.root, 'node_modules/antd')
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=8192&name=/static/img/[name].[ext]?[hash]',
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
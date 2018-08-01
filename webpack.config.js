const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {

    entry: {
        app: './src/index.js',
        main: './src/main.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50
                    }
                }]
            }
            
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './index.html',
            chunks: ['app'],
            // minify: true
        }),
        new HtmlWebpackPlugin({
            minify: {
                // collapseWhitespace: true
            },
            chunks: ['main'],
            filename: 'test.html',
            // hash: true,
            template: './test.html'
        })
    ],
    devServer: {
        // contentBase: path.resolve(__dirname, 'dist'),
        host: '127.0.0.1',
        port: '9527',
        open: true,
        hot: true
    }
}
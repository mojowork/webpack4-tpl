const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCssWebpack = require('purifycss-webpack');
const glob = require('glob');
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
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader'],
                    fallback: 'style-loader',
                    publicPath: '../'
                })
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
                    fallback: 'style-loader',
                    publicPath: '../'
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50,
                        outputPath: 'assets'
                    }
                }]
            }

        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('style/index.css'),
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
        }),
        new PurifyCssWebpack({
            paths: glob.sync(path.join(__dirname, '/*.html'))
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
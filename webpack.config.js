const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: {
        app: './src/index.js',
        main: './src/main.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            chunks: ['app'],
            minify: true
        }),
        new HtmlWebpackPlugin({
            minify: {
                // collapseWhitespace: true
            },
            chunks: ['main'],
            filename: 'test.html',
            hash: true,
            template: './test.html',
        })
    ]
}
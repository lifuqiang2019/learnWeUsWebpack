const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/typescript/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash:4].js'
    },
    devServer: {
        proxy: { // proxy URLs to backend development server
            //'/api': 'http://localhost:3000'
        },
        contentBase: path.resolve(__dirname, './dist'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: false, // only errors & warns on hot reload
    },
    resolve: {
        extensions: ['.js', 'ts', '.tsx', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-react',
                        '@babel/preset-env'
                    ]

                }
            },
            {
                test: /\.(c|le)ss$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.tsx?/,
                use: ['ts-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: '练习 webpack ',
            template: './src/index.html',
            filename: 'index.html'
        }),
    ]
}
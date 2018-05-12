const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './examples/index.html',
        main: './examples/main/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.geojson$/,
                use: {
                    loader: 'json-loader'
                }
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index'],
            template: 'examples/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['main'],
            template: 'examples/main/index.html',
            filename: 'main/index.html'
        })
    ]
};


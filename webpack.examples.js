const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './examples/index.html',
        main: './examples/main/index.js',
        filter: './examples/filter/index.js',
        filter2: './examples/filter-2/index.js'
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
        }),
        new HtmlWebpackPlugin({
            chunks: ['filter'],
            template: 'examples/filter/index.html',
            filename: 'filter/index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['filter2'],
            template: 'examples/filter-2/index.html',
            filename: 'filter-2/index.html'
        })
    ]
};


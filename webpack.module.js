module.exports = {
    mode: 'production',
    entry: './src/Polygonmap.js',
    output: {
        filename: 'polygonmap.min.js',
        path: __dirname + '/umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};

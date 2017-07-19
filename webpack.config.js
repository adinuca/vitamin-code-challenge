module.exports = {
    entry: './src/js/index.js',
    resolve: {
        extensions: ['', '.js'],
        alias: {
            config: path.join(__dirname, './config/dev.js'),
        },
    },
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json-loader'
        }]
    }
};


var path = require('path');
var webpack = require('webpack')

var config = {
    devServer: {
        contentBase: 'assets'
    },
    entry: [
        'webpack/hot/dev-server',
        'whatwg-fetch',
        'bootstrap',
        path.resolve(__dirname, 'main.js'),
        path.resolve(__dirname, 'auth.js')
    ],
    output: {
        filename: 'assets/bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Tesseract: "tesseract.js"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    node: {
        net: "empty",
        tls: "empty"
    }
};

module.exports = config;

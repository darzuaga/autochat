const path = require('path')
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: "./js/ClientApp.jsx",
    devtool: "cheap-eval-source-map",
    output: {
        path: path.join(__dirname, 'public'),
        filename: "bundle.js"
    },
    devServer: {
        hot: true,
        publicPath: '/public/',
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}

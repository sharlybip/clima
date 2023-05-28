const path =require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
        

const ruleForCss = {
    test:/\.css$/i,
    use: [
        MiniCssExtractPlugin.loader,
        "css-loader"

    ]
}
const ruleForJs = {
    test: /\.js?$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader'
    } 
}


module.exports = {
    entry: './src/index.js', // esto se puede obviar
    output: {
        path: path.resolve(__dirname, 'dist'), //esto se puede obviar
        filename: 'index.js'        //esto se puede obviar
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [ruleForJs,ruleForCss]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename:'./index.html'
        }),new MiniCssExtractPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, "src", "assets/videos"),
        //             to: "assets/videos"
        //         },
        //         {
        //             from: path.resolve(__dirname, "src", "assets/images"),
        //             to: "assets/images"
        //         }

        //     ]
        // }),
    ]
}
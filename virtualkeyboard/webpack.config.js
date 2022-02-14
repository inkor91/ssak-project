const path = require("path");
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
module.exports = {
    entry: "./src/js/index.js", // 자바스크립트 파일 진입점
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,"./dist"),
        clean: true
    },
    devtool: "source-map",
    mode: "development",
    devServer:{
        host:"localhost",
        port:8080,
        open:true,
        watchFiles: 'index.html'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "keyboard", // 상단 제목 영역
            template: "./index.html",
            inject: "body", // body부분에 넣어주는 것을 의미
            favicon: "./favicon.ico"
        }),
        new MiniCssExtractPlugin({filename:"style.css"})
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    optimization:{
        minimizer:[
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    }
}
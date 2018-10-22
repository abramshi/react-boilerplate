const webpackMerge = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const commonConfig = require("./webpack.common.js");

module.exports = webpackMerge(commonConfig, {
    devtool: "cheap-module-eval-source-map",
    mode: 'development',
    target: 'electron-renderer',

    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },

    plugins: [
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         "NODE_ENV": JSON.stringify("development")
        //     }
        // }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        historyApiFallback: true,
        hot: true,
        compress: true,
        stats: "minimal",
        proxy: {
            "/api": {
                target: "http://192.168.1.10/",
                pathRewrite: {'^/api/path': ""},
                secure: false
            }
        }
    },

    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            'css-loader?sourceMap',
            'postcss-loader',
            'sass-loader',
          ],
        }
      ]
    }
});

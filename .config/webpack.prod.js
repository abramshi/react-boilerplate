const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const commonConfig = require("./webpack.common.js");

// const ENV = process.env.NODE_ENV = process.env.ENV = "production";

module.exports = webpackMerge(commonConfig, {
    devtool: "source-map",
    mode: 'production',
    target: 'electron-renderer',

    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "",
        filename: "app/[name].[hash:7].bundle.js",
        chunkFilename: "app/[id].[chunkhash:8].chunk.js"
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),
        new MiniCssExtractPlugin({
            filename:"asset/css/[name].[hash:7].bundle.css",
            chunkFilename: "asset/css/[id].[chunkhash:8].chunk.css"
        }),
        // new webpack.DefinePlugin({
        //     // "process.env": {
        //     //     "ENV": JSON.stringify(ENV)
        //     // }
        //     "process.env": {
        //         "NODE_ENV": JSON.stringify("production")
        //     }
        // }),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false // workaround for ng2
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            }
        ]
    }
});

const webpackMerge = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const commonConfig = require("./webpack.common.js");

module.exports = webpackMerge(commonConfig, {
    devtool: "source-map",
    mode: 'production',
    target: 'electron-main',
    entry: './src/main/main',

    output: {
        path: path.resolve(__dirname, "../dist/prod"),
        publicPath: "",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },

    optimization: {
        minimizer: process.env.E2E_BUILD ? [] : [
            new UglifyJSPlugin({
                parallel: true,
                sourceMap: true,
                cache: true
            })
        ]
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode:
                process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
            openAnalyzer: process.env.OPEN_ANALYZER === 'true'
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            DEBUG_PROD: false,
            START_MINIMIZED: false
        }),
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         "NODE_ENV": JSON.stringify("development")
        //     }
        // }),
        new webpack.HotModuleReplacementPlugin()
    ],

    node: {
      __dirname: false,
      __filename: false
    }
});

const webpackMerge = require("webpack-merge");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const commonConfig = require("./webpack.common.js");

module.exports = webpackMerge(commonConfig, {
    devtool: "cheap-module-eval-source-map",

    output: {
        path: path.resolve(__dirname, "../dist/appname"),
        publicPath: "http://localhost:8080/",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    plugins: [
        new ExtractTextPlugin("[name].css")
    ],

    devServer: {
        historyApiFallback: true,
        hot: true,
        stats: "minimal",
        proxy: {
            "/service/common/*": {
                target: "http://localhost/",
                rewrite: function(req) {
                    req.url = req.url.replace(/^\/api\/app/, "");
                },
                secure: false
            }
        }
    }
});

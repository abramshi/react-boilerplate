const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "polyfills": "./src/main/polyfills.ts",
        "mainview": "./src/main/index.tsx"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
        rules: [
            {
                // test: /\.ts[x]?$/,
                test: /\.(ts|tsx)$/,
                loaders: {
                    loader: "awesome-typescript-loader",
                    options: {
                        configFileName: path.resolve(__dirname, "tsconfig.json")
                    }
                }
            },
            {
                // test: /\.js[x]?$/,
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "../src/main/js"),
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                loader: "url-loader",
                options: {
                    // path: path.resolve(__dirname, "../dist"),
                    limit: 10000,
                    name: 'asset/image/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: "url-loader",
                options: {
                    // path: path.resolve(__dirname, "../dist"),
                    limit: 10000,
                    name: 'asset/font/[name].[hash:7].[ext]'
                }
            }
        ]
    },

    plugins: [
        // new webpack.ContextReplacementPlugin(
        //     // The (\\|\/) piece accounts for path separators in *nix and Windows
        //     /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        //     path.resolve(__dirname, "../src/main"), // location of your src
        //     {} // a map of your routes
        // ),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ["app", "polyfills"]
        // }),
        new HtmlWebpackPlugin({
            template: "src/main/index.html"
        })
    ]
};

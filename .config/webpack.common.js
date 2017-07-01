const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "polyfills": "./src/main/polyfills.ts",
        "vendor": "./src/main/vendor.ts",
        "app": "./src/main/main.tsx"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loaders: [{
                    loader: "awesome-typescript-loader",
                    options: {
                        configFileName: path.resolve(__dirname, "../tsconfig.json")
                    }
                }]
            },
            {
                test: /\.js[x]?$/,
                include: path.resolve(__dirname, "app"),
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: "file-loader?name=assets/[name].[hash].[ext]"
            },
            {
                test: /\.css$/,
                exclude: path.resolve(__dirname, "../src/main"),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?sourceMap"
                })
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "../src/main"),
                loader: "raw-loader"
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.resolve(__dirname, "../src/main"), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "vendor", "polyfills"]
        }),

        new HtmlWebpackPlugin({
            template: "src/main/index.html"
        })
    ]
};

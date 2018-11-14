const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const path = require("path");
const commonConfig = require("./webpack.common.js");
const cp = require('child_process');

module.exports = webpackMerge(commonConfig, {
    devtool: "cheap-module-eval-source-map",
    mode: 'development',
    // target: 'electron-renderer',

    output: {
        path: path.resolve(__dirname, "../dist/dev"),
        publicPath: "",
        filename: "app/[name].bundle.js",
        chunkFilename: "app/[id].chunk.js"
    },

    /**
     * Determine the array of extensions that should be used to resolve modules.
     */
    resolve: {
        mainFields: ['browser', 'module', 'main'],
        modules: ['../node_modules']
    },

    plugins: [
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         "NODE_ENV": JSON.stringify("development")
        //     }
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({debug: true})
    ],

    devServer: {
        port,
        publicPath,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        lazy: false,
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        contentBase: path.join(__dirname, 'dist/dev'),
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100
        },
        historyApiFallback: {
            verbose: true,
            disableDotRule: false
        },
        proxy: {
            "/myapi": {
                target: "http://192.168.1.10/",
                pathRewrite: {'^/api/path': ""},
                secure: false
            }
        },
        before() {
            if (process.env.START_HOT) {
                console.log('Starting Main Process...');
                cp.spawn('yarn', ['run', 'start:main-dev'], {
                    shell: true,
                    env: process.env,
                    stdio: 'inherit'
                })
                  .on('close', code => process.exit(code))
                  .on('error', spawnError => console.error(spawnError));
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

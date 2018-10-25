const webpackMerge = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const commonConfig = require("./webpack.common.js");

module.exports = webpackMerge(commonConfig, {
    devtool: "cheap-module-eval-source-map",
    mode: 'development',
    // target: 'electron-renderer',

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
        port,
        publicPath,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        lazy: false,
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        contentBase: path.join(__dirname, 'dist'),
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
            "/api": {
                target: "http://192.168.1.10/",
                pathRewrite: {'^/api/path': ""},
                secure: false
            }
        },
        before() {
            if (process.env.START_HOT) {
                console.log('Starting Main Process...');
                spawn('npm', ['run', 'start-main-dev'], {
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

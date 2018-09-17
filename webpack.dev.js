const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMerge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const commonConfig = require('./webpack.common');

const entryPath = path.join(__dirname, './src');

// const outputPath = path.join(__dirname, './dist');

const customizeTheme = require('./src/theme');

const port = 8000;

const config = {
    mode: 'development',
    devtool: 'source-map',
    entry: [
        'whatwg-fetch',
        require.resolve('react-dev-utils/webpackHotDevClient'),
        path.join(entryPath, './index.tsx'),
    ],
    devServer: {
        contentBase: [entryPath, './node_modules', './public'],
        hot: true,
        historyApiFallback: true,
        inline: true,
        // progress: true,
        host: '0.0.0.0',
        port,
        proxy: {
            '/api':{
                target: 'http://localhost:9000/'
            }
        }
    },
    module:{
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(css|less)$/,
                        use: [
                            require.resolve('style-loader'),
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 1,
                                    alias: { '../img': path.join(__dirname, 'public/img') }
                                },
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    // Necessary for external CSS imports to work
                                    // https://github.com/facebookincubator/create-react-app/issues/2677
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                        autoprefixer({
                                            browsers: [
                                                '>1%',
                                                'last 4 versions',
                                                'Firefox ESR',
                                                'not ie < 9', // React doesn't support IE8 anyway
                                            ],
                                            flexbox: 'no-2009',
                                        }),
                                    ],
                                },
                            },
                            {
                                loader: require.resolve('less-loader'),
                                options: {
                                    sourceMap: true,
                                    javascriptEnabled: true,
                                    modifyVars: customizeTheme
                                },
                            },
                        ],
                    },
                ]
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin({
            format: '  start [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        }),
        // new webpack.DefinePlugin({
        //     "process.env.NODE_ENV": JSON.stringify("development")
        // }),
        new webpack.NamedModulesPlugin(),
        // only development
        // Hot Module Replacement(HMR), in most cases no options are necessary.
        // @see: https://webpack.js.org/plugins/hot-module-replacement-plugin/
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: true,
        }),
        // Perform type checking and linting in a separate process to speed up compilation
        new ForkTsCheckerWebpackPlugin({
            async: false,
            watch: './src',
            tsconfig: './tsconfig.json',
            tslint: './tslint.json',
        }),
    ]
}

module.exports = WebpackMerge(commonConfig, config);

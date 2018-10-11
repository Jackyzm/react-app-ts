const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackMerge = require('webpack-merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const commonConfig = require('./webpack.common');

const entryPath = path.join(__dirname, './src');

const outputPath = path.join(__dirname, './dist');

const customizeTheme = require('./src/theme');

const config = {
    mode: 'production',
    // entry:{
    //     app: [
    //         'whatwg-fetch',
    //         path.join(entryPath, './index.tsx')
    //     ]
    // },
    entry: [
        'whatwg-fetch',
        path.join(entryPath, './index.tsx')
    ],
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(css|less)$/,
                        loader:
                            [
                                {
                                    loader: MiniCssExtractPlugin.loader,
                                },
                                // {
                                //     loader: require.resolve('style-loader'),
                                //     options: {
                                //         hmr: false,
                                //     },
                                // },
                                {
                                    loader: require.resolve('css-loader'),
                                    options: {
                                        importLoaders: 1,
                                        minimize: true,
                                        sourceMap: true,
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
                            ]

                    },
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: {
                        // `inline: false` forces the sourcemap to be output into a
                        // separate file
                        inline: false,
                        // `annotation: true` appends the sourceMappingURL to the end of
                        // the css file, helping the browser find the sourcemap
                        annotation: true,
                    }
                },
            }),
        ],
    },
    plugins: [
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        }),
        // new webpack.DefinePlugin({
        //     "process.env.NODE_ENV": JSON.stringify("production")
        // }),
        // both development and production
        // injected the webpack bundles to `index.html` file.
        // @see: https://webpack.js.org/plugins/html-webpack-plugin/
        // More config @see: https://github.com/jantimon/html-webpack-plugin#configuration
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),

        // Minify the code.
        new UglifyJsPlugin({
            uglifyOptions: {
                parse: {
                    ecma: 8,
                },
                compress: {
                    ecma: 5,
                    warnings: false,
                    comparisons: false,
                },
                mangle: {
                    safari10: true,
                },
                output: {
                    ecma: 5,
                    comments: false,
                    ascii_only: true,
                },
            },
            parallel: true,
            cache: true,
            sourceMap: true,
        }),

        new webpack.NoEmitOnErrorsPlugin(),

        // new ExtractTextPlugin("[name].[hash].css"),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[name].[hash].css',
        }),

        new CopyWebpackPlugin(
            [
                {
                    from: path.join(__dirname, './public/fonts'),
                    to: path.join(outputPath, './fonts/'),
                    // context: 'public'
                },
                {
                    from: path.join(__dirname, './public/img'),
                    to: path.join(outputPath, './img/'),
                }
            ]
        ),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // Perform type checking and linting in a separate process to speed up compilation
        new ForkTsCheckerWebpackPlugin({
            async: false,
            tsconfig: './tsconfig.json',
            tslint: './tslint.json',
        }),
    ]
}

module.exports = WebpackMerge(commonConfig, config);

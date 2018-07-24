var webpack = require('webpack');
var path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackMerge = require('webpack-merge');
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
    module:{
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(css|less)$/,
                        loader: ExtractTextPlugin.extract(
                            {
                                fallback: {
                                    loader: require.resolve('style-loader'),
                                    options: {
                                        hmr: false,
                                    },
                                },
                                use: [
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
                                ],
                            }
                        ),
                    },
                ]
            }
        ]
    },
    plugins: [
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
                // we want uglify-js to parse ecma 8 code. However we want it to output
                // ecma 5 compliant code, to avoid issues with older browsers, this is
                // whey we put `ecma: 5` to the compress and output section
                // https://github.com/facebook/create-react-app/pull/4234
                ecma: 8,
            },
            compress: {
                ecma: 5,
                warnings: false,
                // Disabled because of an issue with Uglify breaking seemingly valid code:
                // https://github.com/facebook/create-react-app/issues/2376
                // Pending further investigation:
                // https://github.com/mishoo/UglifyJS2/issues/2011
                comparisons: false,
            },
            mangle: {
                safari10: true,
            },
            output: {
                ecma: 5,
                comments: false,
                // Turned on because emoji and regex is not minified properly using default
                // https://github.com/facebook/create-react-app/issues/2488
                ascii_only: true,
            },
            },
            // Use multi-process parallel running to improve the build speed
            // Default number of concurrent runs: os.cpus().length - 1
            parallel: true,
            // Enable file caching
            cache: true,
            sourceMap: true,
        }),    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.

        new webpack.NoEmitOnErrorsPlugin(),

        new ExtractTextPlugin("[name].[hash].css"),

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

var path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
// const entryPath = path.join(__dirname, './src');

const outputPath = path.join(__dirname, './dist');

const commonConfig = {
    // mode: 'none',
    output: {
        // Next line is not used in dev but WebpackDevServer crashes without it:
        path: outputPath,
        // This does not produce a real file. It's just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: '[name].[hash].bundle.js',
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: '[name].[hash].chunk.js',
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    resolve: {
        alias: {
            // 目录统一变量
            'img': path.resolve('public/img/'),
            // 'components': path.resolve('src/components/'),
        },
        extensions: [ '.mjs', '.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.json', '.web.jsx', '.jsx', ],
        plugins: [
            new TsconfigPathsPlugin({ configFile: './tsconfig.json' }),
        ],
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(ts|tsx)$/,
                        exclude: [/node_modules/, /lib/],
                        use: [
                            {
                                loader: require.resolve('ts-loader'),
                                options: {
                                    // disable type checker - we will use it in fork plugin
                                    transpileOnly: true,
                                    getCustomTransformers: () => ({
                                        before: [ tsImportPluginFactory({
                                          libraryDirectory: 'lib',
                                          libraryName: 'antd',
                                          style: true,
                                        }) ]
                                    }),
                                    compilerOptions: {
                                        module: 'es2015'
                                    }
                                },
                            },
                        ]
                    },
                    {
                        enforce: "pre",
                        test: /\.js$/,
                        exclude: [/node_modules/, /lib/],
                        loader: require.resolve("source-map-loader")
                    },
                    {
                        test: /\.html$/,
                        loader: require.resolve('html-loader')
                    },
                    {
                        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    },
                    {
                        test: /\.(png|jpg|gif)$/,
                        use: {
                            loader: require.resolve('file-loader'),
                            options: {
                                limit: 8192,
                                name: 'img/[name].[ext]'
                            }
                        }
                    }
                ]
            }
        ]
    },
}

module.exports = commonConfig;

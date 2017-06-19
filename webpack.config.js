const webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, './client');
const staticsPath = path.join(__dirname, './static/build');

module.exports = function (env) {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';

    const plugins = [

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js'
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: nodeEnv,
        }),
        new webpack.NamedModulesPlugin(),
    ];

    if (isProd) {
        plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                },
                output: {
                    comments: false,
                },
            })
        )
    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    }

    return {
        devtool: isProd ? 'source-map' : 'eval',
        context: sourcePath,
        entry: {
            js: './index.tsx',
            vendor: ["react", "react-dom"]
        },
        output: {
            path: staticsPath,
            filename: '[name].bundle.js',
        },
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    loaders: ['awesome-typescript-loader'],
                    include: path.join(__dirname, 'client')
                }, {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                }, {
                    test: /\.scss$/,
                    loader: 'style-loader!css-loader!sass-loader'
                }, {
                    test: /\.(woff|woff2)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            name: 'fonts/[hash].[ext]',
                            limit: 5000,
                            mimetype: 'application/font-woff'
                        }
                    }
                }, {
                    test: /\.(ttf|eot|svg)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[hash].[ext]'
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', " "],
            modules: [
                path.resolve(__dirname, 'node_modules'),
                sourcePath,
            ],
        },

        plugins,

        performance: isProd && {
            maxAssetSize: 100,
            maxEntrypointSize: 300,
            hints: 'warning',
        },

        stats: {
            colors: {
                green: '\u001b[32m',
            }
        },

        devServer: {
            contentBase: './static/build',
            historyApiFallback: true,
            port: 3000,
            compress: isProd,
            inline: !isProd,
            hot: !isProd,
            stats: {
                assets: true,
                children: false,
                chunks: false,
                hash: false,
                modules: false,
                publicPath: false,
                timings: true,
                version: false,
                warnings: true,
                colors: {
                    green: '\u001b[32m',
                }
            },
        }
    }
};
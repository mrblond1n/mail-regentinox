const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const {TypedCssModulesPlugin} = require('typed-css-modules-webpack-plugin');

module.exports = (a, {mode}) => {
    const env = dotenv.config().parsed;

    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);

        return prev;
    }, {});

    return {
        entry: './src/index.jsx',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'index-bundle.js',
            publicPath: '/'
        },
        resolve: {
            // Директории в которых будут скать скрипты если не указан путь
            modules: ['node_modules', 'src'],
            // Расширения которые можно не дописывать при импорте
            extensions: ['.jsx', '.js', '.scss', '.css', '.ts', '.tsx']
        },
        module: {
            rules: [
                {
                    test: /\.([tj])sx?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/i,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        }
                    ]
                },
                {
                    test: /\.xml$/i,
                    use: 'raw-loader'
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new TypedCssModulesPlugin({
                globPattern: 'src/**/*.css',
                camelCase: true,
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new webpack.DefinePlugin({
                ...envKeys,
                'process.env': {
                    NODE_ENV: JSON.stringify(mode)
                }
            }),
        ],
        devServer: {
            compress: true,
            historyApiFallback: true,
            open: 'Google Chrome',
            port: 3000
        }
    };
};

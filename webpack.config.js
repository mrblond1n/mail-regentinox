const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
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
            extensions: ['.jsx', '.js', '.scss', '.css']
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
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
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new webpack.DefinePlugin(envKeys)
        ],
        devServer: {
            compress: true,
            historyApiFallback: true,
            open: 'Google Chrome',
            port: 3000
        }
    };
};

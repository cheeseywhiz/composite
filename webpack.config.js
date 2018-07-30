const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');

module.exports = {
    mode: "development",
    entry: {
        index: path.resolve(SRC_PATH, 'index.js'),
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Composite Operations',
            template: path.resolve(SRC_PATH, 'index.html'),
            filename: 'index.html',
            chunks: ['index'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: SRC_PATH,
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react', 'stage-2'],
                    plugins: ['transform-decorators-legacy'],
                },
            },
            {
                test: /\.css$/,
                include: SRC_PATH,
                loaders: [
                    {
                        loader: 'style-loader',
                        options: {
                            singleton: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]--[local]--[hash:hex:5]',
                        },
                    },
                ],
            },
        ],
    },
};

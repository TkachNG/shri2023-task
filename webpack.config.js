const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;


// @todo загрузить переводы из файла

const config = {
    mode: 'production',
    context: path.resolve(__dirname, 'vendors'),
    entry: {
        index: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HTMLInlineCSSWebpackPlugin({
            replace: {
                removeTarget: true,
                target: '<link rel="stylesheet" href="../styles.css">',
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'vendors/index.html')
        }),
    ],
    resolve: {
        extensions: ['.js'],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    level: {
                        1: {
                            roundingPrecision: "all=3,px=5",
                        },
                    },
                },
                minify: CssMinimizerPlugin.cleanCssMinify,
            }),
        ],
    },
};

module.exports = config;

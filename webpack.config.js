let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let globImporter = require('node-sass-glob-importer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let autoprefixer = require('autoprefixer');
let postcssclick = require('postcss-click');
let backgroundSvg = require('postcss-encode-background-svgs');
let cssnext = require('postcss-preset-env');
let animation = require('postcss-animation');
let stylelint = require('stylelint');
let CopyPlugin = require('copy-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


let conf = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main.js'

    },
    devtool: "source-map",
    mode: "production",
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                sourceMap: true,
                extractComments: true
            })
        ]
    },
    devServer: {
        overlay: true,
        port: 3010
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                postcssclick(),
                                cssnext(),
                                backgroundSvg(),
                                animation()
                            ],
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                importer: globImporter(),

                            },
                            sourceMap: true
                        }
                    }
                ],

            },
            {
                test: /\.(pug|jade)$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
        ]

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.pug'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new CopyPlugin([
            {from: './src/images', to: './images'},
            {from: './src/fonts', to: './fonts'}
        ]),
    ]

};

module.exports = conf;

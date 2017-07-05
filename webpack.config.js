let path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const BabiliPlugin = require("babili-webpack-plugin");

//create external css file
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'dart-support.user.js',
        libraryTarget: "var",
        library: 'ujs',
        path: path.resolve(__dirname)
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : false,
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.BannerPlugin({
            banner: `// ==UserScript==\n// @name DartIT tracker-tweaker revo\n// @updateURL https://github.com/a-mann/alamics-tracker/raw/master/dart-support.user.js\n// @downloadURL https://github.com/a-mann/alamics-tracker/raw/master/dart-support.user.js\n// @description индивидуальные настройки для support.dartit.ru, support.alamics.ru;\n// @include https://support.dartit.ru/*\n// @include https://support.alamics.ru/*\n// @require https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.3.1/markdown-it.min.js\n// @grant unsafeWindow\n// @author mann\n// @license MIT\n// @version 1.5.14\n// ==/UserScript==`,
            entryOnly: true,
            raw: true
        })
        //create external css file
        //new ExtractTextPlugin('css/styles.css')
    ],
    module: {
        rules: [
            {
                test: /\.pcss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ],
                //create external css file
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: [
                //         {
                //             loader: 'css-loader',
                //             options: {
                //                 importLoaders: 1,
                //             }
                //         },
                //         {
                //             loader: 'postcss-loader'
                //         }
                //     ]
                // })
            }
            //babel
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "babel-loader",
            //     options: {
            //         presets: ['es2015','env']
            //     }
            // }
        ]
    }
};

if(NODE_ENV === 'production'){
    module.exports.plugins.push(
        new BabiliPlugin({},{
            comments: /@preserve|@licen(s|c)e|==UserScript==|==\/UserScript==|@name|@updateURL|@downloadURL|@description|@include|@require|@grant|@author|@version/
        })
    )
}
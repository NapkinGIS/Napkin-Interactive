/*©agpl*************************************************************************
*                                                                              *
* Napkin Globe – Map-data interaction solution for the Napkin platform         *
* Copyright (C) 2020  Napkin AS                                                *
*                                                                              *
* This program is free software: you can redistribute it and/or modify         *
* it under the terms of the GNU Affero General Public License as published by  *
* the Free Software Foundation, either version 3 of the License, or            *
* (at your option) any later version.                                          *
*                                                                              *
* This program is distributed in the hope that it will be useful,              *
* but WITHOUT ANY WARRANTY; without even the implied warranty of               *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                 *
* GNU Affero General Public License for more details.                          *
*                                                                              *
* You should have received a copy of the GNU Affero General Public License     *
* along with this program. If not, see <http://www.gnu.org/licenses/>.         *
*                                                                              *
*****************************************************************************©*/

'use strict';

/*global require*/
var configureWebpackForTerriaJS = require('terriajs/buildprocess/configureWebpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');

module.exports = function(devMode, hot) {
    var config = {
        mode: devMode ? 'development' : 'production',
        entry: './entry.js',
        output: {
            path: path.resolve(__dirname, '..', 'wwwroot', 'build'),
            filename: 'TerriaMap.js',
            // work around chrome needing the full URL when using sourcemaps (http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809)
            publicPath: hot ? 'http://localhost:3003/build/' : 'build/',
            sourcePrefix: '', // to avoid breaking multi-line string literals by inserting extra tabs.
            globalObject: '(self || window)' // to avoid breaking in web worker (https://github.com/webpack/webpack/issues/6642)
        },
        devtool: devMode ? 'cheap-inline-source-map' : 'source-map',
        module: {
            rules: [
                {
                    test: /\.html$/,
                    include: path.resolve(__dirname, '..', 'lib', 'Views'),
                    loader: 'raw-loader'
                },
                {
                    test: /\.(js|jsx)$/,
                    include: [
                        path.resolve(__dirname, '..', 'index.js'),
                        path.resolve(__dirname, '..', 'entry.js'),
                        path.resolve(__dirname, '..', 'lib')

                    ],
                    loader: 'babel-loader',
                    options: {
                        sourceMap: false, // generated sourcemaps are currently bad, see https://phabricator.babeljs.io/T7257
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            'babel-plugin-jsx-control-statements',
                            '@babel/plugin-transform-modules-commonjs'
                        ]
                    }
                },
                {
                    test: /\.(png|jpg|svg|gif)$/,
                    include: path.resolve(__dirname, '..', 'wwwroot', 'images'),
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                },
                {
                    test: /globe\.gif$/,
                    include: path.resolve(__dirname, '..', 'lib', 'Styles'),
                    loader: 'url-loader',
                    options: {
                        limit: 65536
                    }
                },
                {
                    test: /loader\.css$/,
                    include: [path.resolve(__dirname, '..', 'lib', 'Styles')],
                    loader: ['style-loader', 'css-loader']
                },
                {
                    test: /\.scss$/,
                    include: [path.resolve(__dirname, '..', 'lib')],
                    loader: hot ? [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                                camelCase: true,
                                localIdentName: 'tm-[name]__[local]',
                                importLoaders: 2
                            }
                        },
                        'resolve-url-loader?sourceMap',
                        'sass-loader?sourceMap'
                    ] : [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                                camelCase: true,
                                localIdentName: 'tm-[name]__[local]',
                                importLoaders: 2
                            }
                        },
                        'resolve-url-loader?sourceMap',
                        'sass-loader?sourceMap'
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({filename: "TerriaMap.css", disable: hot, ignoreOrder: true, allChunks: true})
        ],
       resolve: {
            alias: {},
            modules: ['node_modules']
        }
    };
    config.resolve.alias['terriajs-variables'] = require.resolve('../lib/Styles/variables.scss');
    return configureWebpackForTerriaJS(path.dirname(require.resolve('terriajs/package.json')), config, devMode, hot, MiniCssExtractPlugin);
};

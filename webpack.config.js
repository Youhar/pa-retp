/// avoid destructuring for older Node version support
const resolve = require('path').resolve;
const webpack = require('webpack');

const CONFIG = {
    entry: {
        app: resolve('./app.js')
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                // Compile ES2015 using buble
                test: /\.js$/,
                loader: 'buble-loader',
                include: [resolve('.')],
                exclude: [/node_modules/],
                options: {
                    objectAssign: 'Object.assign'
                }
            }
        ],
    },

    resolve: {
        alias: {
            // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
            'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
        }
    },

    // Optional: Enables reading mapbox token from environment variable
    plugins: [
        new webpack.EnvironmentPlugin(['MAPBOX_ACCESS_TOKEN'])
    ]
};

require('dotenv').config();
module.exports = env => CONFIG;

/// avoid destructuring for older Node version support
const resolve = require('path').resolve;
const webpack = require('webpack');

// Otherwise modules imported from outside this directory does not compile
// Seems to be a Babel bug
// https://github.com/babel/babel-loader/issues/149#issuecomment-191991686
const BABEL_CONFIG = {
    presets: [
      'es2015',
      'stage-2',
      'react'
    ].map(name => require.resolve(`babel-preset-${name}`)),
    plugins: [
      'transform-decorators-legacy'
    ].map(name => require.resolve(`babel-plugin-${name}`))
  };

const CONFIG = {
    entry: {
        app: resolve('./src/app.js')
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                // Compile ES2015 using buble
                test: /\.js$/,
                loader: 'babel-loader',
                options: BABEL_CONFIG,
                include: [resolve('.')],
                exclude: [/node_modules/],
            }, {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader', 'autoprefixer-loader']
            }
        ],
    },

    resolve: {
        // Prefer root dependencies (dev) over local (prod)
        modules: [resolve('../node_modules'), resolve('./node_modules')],
        alias: {
          // Website is using React 15
          react: resolve('.', './node_modules/react'),
          'react-dom': resolve('.', './node_modules/react-dom'),
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

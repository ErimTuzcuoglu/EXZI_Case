const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');
const CompressionPlugin = require('compression-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api/'),
      '@application': path.resolve(__dirname, 'src/application/'),
      '@config': path.resolve(__dirname, 'src/config/'),
      '@core': path.resolve(__dirname, 'src/core/'),
    },
    extensions: ['.js'],
  },
  plugins: [
    new WebpackObfuscator({
      rotateStringArray: true,
      stringArray: true,
      stringArrayThreshold: 0.75,
      compact: true,
      controlFlowFlattening: true,
    }),

    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240, // Min size for compression (10 KB)
      minRatio: 0.8,
    }),
    new Dotenv({
      path: './.env.production',
    }),
  ],
};

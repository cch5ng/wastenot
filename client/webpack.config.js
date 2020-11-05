const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {InjectManifest} = require('workbox-webpack-plugin');
const loader = require('sass-loader');
//const Autoprefixer = require('autoprefixer');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});

  return {
    mode: 'development',
    entry: './src/index.js',
    output: {
       path: __dirname + '/dist',
       publicPath: '/',
       filename: 'bundle.js'
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        { test: /\.tsx?$/, loader: 'ts-loader' },
        {
          test: /\.(sa|sc|c)ss$/,
          use: ['style-loader',
            //'typescript-plugin-css-modules',
            //MiniCssExtractPlugin.loader,
            'css-loader',
            //'postcss-loader',
            //'sass-loader',
          ]
        }
      ],
    },
    resolve: {
      extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        title: 'Waste Not',
        template: 'src/index.html'
      }),
      //new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        //filename: 'style.[contenthash].css'
        //filename: "[name].css",
        //chunkFilename: "[id].css"
      //}),
      new InjectManifest({
        swSrc: './src/sw.js',
      }),
      //require('autoprefixer'),
    ], 
    devServer: {
      contentBase: './dist',
      stats: "errors-only",
      compress: true,
      hot: true,
      port: 8080, // Defaults to 8080
      open: true, // Open the page in browser    
      historyApiFallback: true
    }
  }
};

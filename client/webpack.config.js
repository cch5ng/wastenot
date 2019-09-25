const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            //'style-loader',
            { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
            'postcss-loader'
          ]
          // use: [
          //   devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          //   'css-loader',
          //   'postcss-loader',
          //   //'sass-loader',
          // ],
        }
      ],
      
    },

    resolve: {
      extensions: ['*', '.js', '.jsx']
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(envKeys),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ], 

    devServer: {
      contentBase: './dist',
      stats: "errors-only",
      compress: true,
      hot: true,
      port: 8080, // Defaults to 8080
      open: true, // Open the page in browser    
    }
  }
};
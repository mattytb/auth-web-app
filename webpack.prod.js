const webpack = require("webpack");
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    { 
      test: /\.css$/, 
      loader: "style-loader!css-loader" 
    },
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader',
      options: { limit: 8192}
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
       'process.env': {
           'NODE_ENV': JSON.stringify('production')
       }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new ExtractTextPlugin("styles.css")
  ],
  resolve: {
      extensions: ['.js', '.jsx', '.css']
  }
}
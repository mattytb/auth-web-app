module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './src/index.jsx'
  ],
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
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    
    historyApiFallback: {
      index: 'index.html'
    },
    contentBase: './dist'
  }
};
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    port: 9000
  }
};

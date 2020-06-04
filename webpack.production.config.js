var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve('./public/dist'),
    filename: 'app.js',
    library: 'ReactFormBuilder',
    libraryTarget: 'umd'
  },

  externals: {
    'bootstrap': 'bootstrap'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
    alias: {
      "jquery": path.join(__dirname, "./jquery-stub.js")
    }
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js|.jsx?$/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader', options: {
              sassOptions: {
                includePaths: ['./node_modules'],
              },
            }
          }
        ]
      },
    ]
  },
  performance: {
    hints: false
  }
};
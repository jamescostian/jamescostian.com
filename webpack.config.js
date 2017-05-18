const {join} = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    join(__dirname, 'css', 'main.css'),
    join(__dirname, 'js', 'main.js')
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: {
            loader: 'css-loader',
            options: {
              url: false,
              minimize: true,
              sourceMap: true
            }
          }
        })
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new (require('babili-webpack-plugin'))(),
    new ExtractTextPlugin('bundle.css')
  ]
}

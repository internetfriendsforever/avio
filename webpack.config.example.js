const path = require('path')

module.exports = {
  entry: './src/index.js',

  output: ({
    path: path.join(__dirname, 'lib'),
    filename: 'avio.js',
    libraryTarget: 'window'
  }),

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'example'),
    host: '0.0.0.0'
  }
}

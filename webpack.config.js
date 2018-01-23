const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')

const config = {
  entry: './src/index.js',

  output: filename => ({
    path: path.join(__dirname, 'lib'),
    filename: filename,
    libraryTarget: 'this'
  }),

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}

const full = {
  entry: config.entry,
  devtool: 'source-map',
  output: config.output('avio.js'),
  module: config.module
}

const min = {
  entry: config.entry,
  output: config.output('avio.min.js'),
  module: config.module,
  plugins: [
    new MinifyPlugin()
  ]
}

module.exports = [full, min]

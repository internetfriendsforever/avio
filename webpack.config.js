const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')

const output = filename => ({
  path: path.join(__dirname, 'lib'),
  filename: filename,
  library: 'avio',
  libraryTarget: 'umd',
  umdNamedDefine: true
})

const full = {
  entry: './src/index.js',

  devtool: 'source-map',

  output: output('avio.js'),

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

const min = {
  entry: './src/index.js',

  output: output('avio.min.js'),

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new MinifyPlugin()
  ]
}

module.exports = [full, min]

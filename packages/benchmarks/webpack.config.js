// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin
const path = require('path')
const webpack = require('webpack')

module.exports = {
  // context: __dirname,
  // devtool: 'eval',
  entry: './index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'performance.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { module: true, localIdentName: '[hash:base64:8]' }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [['env', { modules: false }], 'react', 'stage-0'],
            plugins: ['babel-macros'],
            cacheDirectory: true
          }
        }
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   openAnalyzer: false
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin()
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     dead_code: true,
    //     screw_ie8: true,
    //     warnings: false
    //   }
    // })
  ]
}

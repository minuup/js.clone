const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        // sass, scss 둘다 됨
        test: /\.s[ac]ss$/i,
        // 순서가 뒤에서 부터 시작함
        use: [
          'style-loader', // 3. styles를 DOM에 삽입
          'css-loader', // 2. css를 commonjs로 변환
          'sass-loader', // 1. scss를 css로 변환
        ],
      },
    ],
  },
});

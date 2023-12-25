const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        // sass, scss 둘다 됨
        test: /\.s[ac]ss$/i,
        // 순서가 뒤에서 부터 시작함
        use: [
          MiniCssExtractPlugin.loader, // 3. css를 file로 추출
          'css-loader', // 2. css를 commonjs로 변환
          'sass-loader', // 1. scss를 css로 변환
        ],
      },
    ],
  },
});

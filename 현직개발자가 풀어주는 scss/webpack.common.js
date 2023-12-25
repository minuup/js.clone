module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
      },

      // Webpack 4의 설정
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   loader: 'file-loader',
      //   // use: {
      //   //   loader: 'file-loader',
      //   //   options: {
      //   //     name: '[name].[hash].[ext]',
      //   //     outputPath: 'imgs',
      //   //   },
      //   // },
      // },
      // {
      //   test: /\.svg$/,
      //   loader: 'url-loader'
      // },
    ],
  },
};

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['./node_modules/@design-system-rt/rtk-ui-kit/index.js'],
  output: {
    filename: './js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: 'env',
          },
        },
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(
          __dirname,
          './node_modules/@design-system-rt/rtk-ui-kit'
        ),
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true,
              },
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './css/style.bundle.css',
      allChunks: true,
    }),
  ],
};

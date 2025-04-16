import path from 'path';

module.exports = {
  entry: './assets/featured-products.js',
  output: {
    filename: 'featured-products.bundle.js',
    path: path.resolve(__dirname, 'assets'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  mode: 'production',
};

import path from 'path';
import { fileURLToPath } from 'url';

// Це потрібно, щоб отримати __dirname в ES-модулі
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
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

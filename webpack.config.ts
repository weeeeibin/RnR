const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // production development
  entry: {
    app: './src/App.tsx'
  },
  // devtool: "source-map",
  devServer: {
    contentBase: './public',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss?$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: 'css-loader',
          options: {
            // 开启 CSS Modules
            modules: {
              localIdentName: '[local]',
            },
          }
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.css?$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: 'css-loader',
        }]
      },
      {
        test: /\.(png|jpe?g)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 10000
        }
      },
      {
        test: /\.ttf?$/,
        loader: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React',
      filename: 'index.html',
      template: './public/index.html',
      chunks: ['component']
    })
  ]
};
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js',
    './scss/main.scss',
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react'],
        },
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `${__dirname}/dist/bundle.css`,
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    hot: true,

    proxy: {
      '/api': {
        target: {
          host: 'localhost',
          protocol: 'http:',
          port: 8080,
        },
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    // headers: {
    //   'Access-Control-Allow-Origin': 'http://localhost:8080',
    //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    //   'Access-Control-Allow-Credentials': 'true',
    //   'Access-Control-Allow-Headers':
    //     'X-Requested-With, content-type, Authorization',
    // },
  },
};

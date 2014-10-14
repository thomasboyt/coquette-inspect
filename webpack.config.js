var webpack = require('webpack');

module.exports = {
  entry: {
    ui: './src/ui/index.js',
    agent: './src/agent/index.js',
    vendor: [
      'react',
      'lodash',
      'uuid',
      'fluxxor'
    ]
  },

  output: {
    path: 'chrome-extension/build/',
    publicPath: 'build',
    filename: '[name].bundle.js'
  },

  resolve: {
    // allow resolve modules that are in node_modules/ before looking into subdirectory
    // prevent duplicate copies of modules
    root: require('path').resolve('./node_modules')
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor.bundle.js', ['ui', 'vendor'])
  ],

  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'jsx?harmony'
      },

      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },

      {
        test: /(?:\.woff$|\.ttf$|\.svg$|\.eot$)/,
        loader: 'file-loader',
        query: {
          name: '/build/font/[hash].[ext]'
        }
      },
    ]
  }
};

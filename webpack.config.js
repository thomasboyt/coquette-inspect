module.exports = {
  entry: {
    ui: './src/ui/index.js',
    debug: './src/debug/index.js'
  },

  output: {
    path: 'chrome-extension/',
    filename: '[name].bundle.js'
  },

  resolve: {
    // allow resolve modules that are in node_modules/ before looking into subdirectory
    // prevent duplicate copies of modules
    root: require('path').resolve('./node_modules')
  }
};

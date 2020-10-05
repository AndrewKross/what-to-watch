const path = require(`path`);

module.exports = {
  entry: {
    index: `./src/index.js`,
  },
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
    publicPath: `/what-to-watch/`,
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: true,
    inline: true,
    port: 8080,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
    ],
  },
  resolve: {
    extensions: [`.js`, `.jsx`],
  },
  devtool: `source-map`,
};

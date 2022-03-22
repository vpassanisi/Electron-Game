const path = require('path');

module.exports = {
  resolve: {
    alias: {
      renderer: path.resolve(__dirname, './src/renderer')
    }
  }
}
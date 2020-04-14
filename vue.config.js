const path = require('path')
module.exports = {
  // devServer: {
  //   host: "192.168.1.108",
  //   port: 8080
  // },
  configureWebpack: {
    resolve: {
      alias: {
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
        network: path.resolve(__dirname, 'src/network'),
        views: path.resolve(__dirname, 'src/views'),
        common: path.resolve(__dirname, 'src/common'),
        element: path.resolve(__dirname, 'src/element')
      }
    }
  }
}

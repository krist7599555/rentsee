module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:19888',
        ws: true,
        changeOrigin: true
      }
    }
  }
};

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/anomaly_tracker/'
  : '/',
  lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ]
}

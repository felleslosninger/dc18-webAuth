module.exports = {
  bsFiles: {
    src : config.browserSync.src
  },
  options: {
    proxy: config.browserSync.proxy,
    reloadDebounce: 500
  }
}

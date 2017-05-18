module.exports = {
  options: {
    sourceMap: true,
    presets: ['es2015']
  },
  dev: {
    files: [{
      expand: true,
      cwd: config.src.js.path,
      src: [
        '*.js', '**/*.js'
      ],
      dest: config.dev.js.path
    }]
  }
}

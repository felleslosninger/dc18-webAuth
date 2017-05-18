module.exports = {
  dev: {
    options: {
      transform: [["babelify"]]
    },
    files: {
      "dev/js/main.js": "src/js/main.js"
    }
  }
}

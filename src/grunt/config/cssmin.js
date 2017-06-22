module.exports = {

  build : {
    options: {
      shorthandCompacting: false,
      roundingPrecision: -1
    },
    //cwd : config.build.css.path,
    //expand : true,
    files : [
      {
        expand: true,
        cwd: config.dev.css.path,
        src: ['*.css', '!*.min.css'],
        dest: config.build.css.path,
        ext: '.min.css'
      }
    ]
  }

}

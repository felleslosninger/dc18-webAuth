module.exports = {

  dev : {
    options : {
      style : 'nested',
      trace : false,
      precision : 10,
      noCache : true,
      lineNumbers : false,
    },
    files : [
      {
        expand: true,
        cwd: config.src.sass.path,
        src: ['*.scss'],
        dest: config.dev.css.path,
        ext: '.css'
      }
    ]
  },
  build : {
    options : {
      style : 'nested',
      trace : false,
      precision : 10,
      noCache : true,
      lineNumbers : false,
    },
    files : [
      {
        expand: true,
        cwd: config.src.sass.path,
        src: ['*.scss'],
        dest: config.build.css.path,
        ext: '.css'
      }
    ]
  }

};

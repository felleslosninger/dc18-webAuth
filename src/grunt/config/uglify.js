module.exports = {

  options: {
    compress: {
      drop_console: true,

    },
    mangle: {
      except: ['jQuery', 'bootstrap']
    }
  },
  build: {
    files : [{
      src: [config.build.js.path + config.build.js.vendorfile],
      dest : config.build.js.path + config.build.js.vendorfileminified,

    }
//    ,{
//      src: [config.build.js.path + config.build.js.scriptfile],
//      dest : config.build.js.path + config.build.js.scriptfileminified,
//    }
  ]


  }
}

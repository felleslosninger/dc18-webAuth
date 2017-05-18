module.exports = function(grunt) {

  var
  pages = {},
  articles = {},
  layouts = {},
  sections = {};

  // Check every component, build mapping object
  grunt.file.recurse(config.src.templates.pages, function(abspath, rootdir, subdir, filename) {
    pages[filename.replace('.html', '')] = abspath;
  });

  // Check every layout, build mapping object
  grunt.file.recurse(config.src.templates.layout, function(abspath, rootdir, subdir, filename) {
    layouts[filename.replace('.html', '')] = abspath;
  });

  // Check every layout, build mapping object
  grunt.file.recurse(config.src.templates.sections, function(abspath, rootdir, subdir, filename) {
    sections[filename.replace('.html', '')] = abspath;
  });

  return {

    dev: {
      cwd: config.src.templates.pages,
      expand: true,
      src: '*.html',
      dest: config.dev.html.pages.path,
      options: {
        beautify: true,
        relative: true,
        scripts: {
          bundle: [
            config.dev.vendor.path + '*.js', config.dev.vendor.path + '**/*.js'
          ],
          main: [config.dev.js.path + '*.js'
          //, config.dev.js.path + '**/*.js', '!' + config.dev.vendor.path + '/*.*'
        ],
        build: []
      },
      sections: {
        page: pages,
        layout: layouts,
        section: sections
      }
      ,
      styles: {
        bundle: [],
        main: config.dev.css.path + config.dev.css.cssfile,
        build: []
      },
      data: {
        mode: 'DEV',
        imgpath: config.dev.img.relativepath
      }
    }
  },
  build: {
    cwd: config.src.templates.pages,
    expand: true,
    src: '*.html',
    dest: config.build.html.pages.path,
    options: {
      beautify: true,
      relative: true,
      scripts: {
        bundle: [
          config.build.js.path + config.build.js.vendorfileminified
        ],
        main: config.build.js.path + config.build.js.scriptfileminified
      },
      sections: {
        pages: pages,
        layout: layouts,
        section: sections
      }

      ,
      styles: {
        bundle: [],
        main: config.build.css.path + config.build.css.cssfileminified
      },
      data: {
        mode: 'BUILD',
        imgpath: config.build.img.relativepath
      }
    }
  }
};

};

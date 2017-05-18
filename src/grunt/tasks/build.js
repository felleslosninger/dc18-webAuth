module.exports = function(grunt) {
  grunt.registerTask('build', [

    'clean:build_sass',
    'clean:build_fonts',
    'clean:build_img',
    'clean:build_js',
    'clean:build_html'

    // PROD
    , 'copy:build_fonts', 'copy:build_img', 'copy:build_sections', 'sass:build', 'concat:build'

    // Minify CSS
    , 'cssmin:build', 'copy:build_css'
    // Minify JS
    , 'uglify:build'
    // BUILD PROD HTML
    , 'htmlbuild:build'

  ]);
};

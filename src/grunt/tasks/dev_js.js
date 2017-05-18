module.exports = function(grunt) {
  grunt.registerTask('dev_js', [

    'notify:dev_js'
    , 'clean:dev_js'
    , 'copy:dev_js'
    , 'browserify:dev'
    , 'notify:done'
    ]);
};

module.exports = function(grunt) {
	grunt.registerTask('dev_fonts', [

		'notify:dev_fonts'
		, 'clean:dev_fonts'
		, 'copy:dev_fonts'
		, 'notify:done'

		]);
};
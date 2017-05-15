module.exports = function(grunt) {
	grunt.registerTask('dev_html', [


		'notify:dev_html'
		,'clean:dev_html'
		, 'htmlbuild:dev'
		, 'notify:done'

		]);
};
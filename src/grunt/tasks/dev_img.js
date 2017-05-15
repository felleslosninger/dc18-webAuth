module.exports = function(grunt) {
	grunt.registerTask('dev_img', [


		'notify:dev_img'
		, 'clean:dev_img'
		, 'copy:dev_img'
		, 'notify:done'

		]);
};

module.exports = function(grunt) {
	grunt.registerTask('dev', [
		'clean',
	]);

	grunt.task.run('dev_clean');
	grunt.task.run('dev_sass');
	grunt.task.run('dev_fonts');
	grunt.task.run('dev_js');
	grunt.task.run('dev_img');
	grunt.task.run('dev_html');


	grunt.task.run('watch');

};
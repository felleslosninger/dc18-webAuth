module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	config = grunt.file.readJSON('Grunt.config.json');
	config.dirname = __dirname;
	var path = require('path');

	require('load-grunt-config')(grunt, {
		configPath: path.join(process.cwd(), config.grunt.config.path),
		jitGrunt: {
			customTasksDir: config.grunt.tasks.path
		},
		data: {
			config : config
		}
	});


}
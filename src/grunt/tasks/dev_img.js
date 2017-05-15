module.exports = function(grunt) {
	grunt.registerTask('dev_img', [


		'notify:dev_img'
		, 'clean:dev_img'
		, 'copy:dev_img'
		, 'clean:dev_svg'
		, 'svgmin:src'
		, 'grunticon:src'
		, 'copy:src_svgcss'
		, 'notify:done'
		
		]);
};
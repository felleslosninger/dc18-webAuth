module.exports = {

	options: {
		separator: '\n\n',
	}
	, vendor : {
		//cwd : config.src.vendor.path,
		//// http://stackoverflow.com/questions/21496226/odd-behavior-from-grunt-contrib-concat-when-using-globbing-pattern
		src: [config.src.vendor.path + '*.js', config.src.vendor.path + '**/*.js'],
		dest: config.dev.js.path + config.dev.js.vendorfile,
	}
	, build : {
		files : [
			{ 
				src: [config.dev.js.path + '*.js']
				, dest: config.build.js.path + config.build.js.scriptfile
			}
			, { 
				src: [config.dev.vendor.path + '*.js', config.dev.vendor.path + '**/*.js']
				, dest: config.build.js.path + config.build.js.vendorfile
			}
			, { 
				src: [config.dev.css.path + config.dev.css.buildcssfile]
				, dest: config.build.css.path + config.build.css.cssfile
			}
		]
	}
	, external : {
		options : {
			process : function(src, filepath) {
				return ""
			}
		}
	}
}
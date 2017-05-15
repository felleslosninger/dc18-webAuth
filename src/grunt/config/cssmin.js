module.exports = {

	build : {
		options: {
			shorthandCompacting: false,
			roundingPrecision: -1
		},
		cwd : config.build.css.path,
		//expand : true,
		files : {
			"<%= config.build.css.path + config.build.css.cssfileminified %>" : [
				config.build.css.path + config.build.css.cssfile
			]
		}
	}
	
}
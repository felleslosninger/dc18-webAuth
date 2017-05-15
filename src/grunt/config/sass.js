module.exports = {

  dev : {
		options : {
			style : 'nested',
			trace : false,
			precision : 10,
			noCache : true,
			lineNumbers : false,
		},
		files : [
		{
			src : config.src.sass.path + config.src.sass.sassfile,
			dest : config.dev.css.path + config.dev.css.cssfile,
		}
		
		]
	},
	build : {
		options : {
			style : 'nested',
			trace : false,
			precision : 10,
			noCache : true,
			lineNumbers : false,
		},
		files : [
		{
			src : config.src.sass.path + config.src.sass.buildsassfile,
			dest : config.dev.css.path + config.dev.css.buildcssfile,
		}
		]
	}

};
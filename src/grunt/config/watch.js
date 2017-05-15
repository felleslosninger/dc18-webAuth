module.exports = {

	
	options: {
		nospawn: true
	}
	, dev_sass : {
		files : [
		config.src.sass.path + '*.scss'
		, config.src.sass.path + '**/*.scss'
		],
		tasks : [
		'dev_sass'
		]
	}
	, dev_fonts : {
		files : [
		config.src.fonts.path + '*.*'
		, config.src.fonts.path + '**/*.*'
		],
		tasks : [
		'dev_fonts'
		]
	}
	, dev_js: {
		files: [
		config.src.js.path + '*.js'
		, config.src.js.path + '**/*.js'
		, config.src.vendor.path + '*.js'
		, config.src.vendor.path + '**/*.js'
		],
		tasks: [
		'dev_js'
		]
	}
	
	, dev_img : {
		files: [
		config.src.img.path + '*.*'
		, config.src.svg.raw + '*.*'
		],
		tasks: [
		'dev_img'
		]
	}
	, dev_html : {
		files: [
		config.src.templates.pages + '*.*'
		, config.src.templates.layout + '*.*'
		, config.src.templates.articles + '*.*'
		, config.src.templates.sections + '*.*'
		],
		tasks: [
		'dev_html'
		]
	}
	
};
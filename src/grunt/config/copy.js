module.exports = {

	src_svgcss: {
		files: [{
			expand: true,
			cwd: config.src.svg.output,
			src: [
				config.src.svg.svgfile
			],
			dest: config.src.sass.path
		}]
	}

	,
	dev_css: {
		files: [
			// CSS
			{
				expand: true,
			cwd: config.src.css.path,
				src: [
					'*.css'
				],
				dest: config.dev.css.path
			}, {
				expand: true,
				cwd: config.src.sass.path,
				src: [
					'*.css'
				],
				dest: config.dev.css.path
			}
		]
	},
	dev_fonts: {
		files: [
			// FONTS
			{
				expand: true,
				cwd: config.src.fonts.path,
				src: [
					'*.*', '**/*'
				],
				dest: config.dev.fonts.path
			}

		]
	},
	dev_js: {
		files: [
			// JS SCRIPT
			{
				expand: true,
				cwd: config.src.js.path,
				src: [
					'*.*', '**/*'
				],
				dest: config.dev.js.path
			}
			// JS VENDOR
			, {
				expand: true,
				cwd: config.src.vendor.path,
				src: [
					'*.*', '**/*'
				],
				dest: config.dev.vendor.path
			}
		]
	},
	dev_img: {
		files: [

			// IMAGES
			{
				expand: true,
				cwd: config.src.img.path,
				src: [
					'*.*', '**/*'
				],
				dest: config.dev.img.path
			}
		]
	},

	build_css: {
		files: [{
			expand: true,
			cwd: config.dev.css.path,
			src: [
				'_*.css'
			],
			dest: config.build.css.path
		}]
	},
	build_fonts: {
		files: [
			// FONTS
			{
				expand: true,
				cwd: config.dev.fonts.path,
				src: [
					'*.*', '**/*'
				],
				dest: config.build.fonts.path
			}

		]
	},
	build_img: {
		files: [

			// IMAGES
			{
				expand: true,
				cwd: config.dev.img.path,
				src: [
					'*.*', '**/*'
				],
				dest: config.build.img.path
			}
		]
	},
	build_sections: {
		files: [

			// HTML SECTIONS, JUST COPYING TO BUILD
			{
				expand: true,
				cwd: config.src.templates.sections,
				src: [
					'*.*', '**/*'
				],
				dest: config.build.html.sections.path
			}
		]
	}


}
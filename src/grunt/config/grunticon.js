module.exports = {

	src: {
		files: [{
			expand: true,
			cwd: config.src.svg.compressed,
			src: ['*.svg'],
			dest: config.src.svg.output
		}],
		options: {
			datasvgcss : config.src.svg.svgfile,
			cssprefix: '.svg-',
			colors: {
				light: '#ccc',
				danger: '#ed3921',
				success: '#8DC63F'
			}
		}
	}
}
module.exports = {

	options: {
		plugins: [
		{ removeViewBox: false },
		{ removeUselessStrokeAndFill: false }
		]
	},
	src: {
		expand: true,
		cwd: config.src.svg.raw,
		src: ['*.svg'],
		dest: config.src.svg.compressed,
		//ext: '.colors-light-danger-success.svg'
	}
}
var wcag = require('wcag')
_ = require('lodash')
clc = require('cli-color');
;

var uri = process.argv.slice(2);
if (uri.length == 0) {
	console.error('Please provide URI');
	process.exit(1);
}

var host = "";

var options = {
	id: '2ad29823e490d794593115b57f3b5b1c5389aca7',
	uri: uri[0],
	guide: 'WCAG2-AA'
};


wcag(options, function (error, data) {
	if (error) {
		console.error(error);
	} else {

		console.log(clc.yellow('\n\n\nTESTING: ' + uri[0]));

		if (data.errors.lentgh) {
			console.log(clc.cyan('\n========== ERRORS =========='));
			_.each(data.errors, function(row, index){
				console.log(clc.red('[' + row.line + ':' + row.column + ']' + ' ' + row.message + '\r'));
			})
		} else
			console.log(clc.bgGreen('NO ERRORS' + '\r'));

		if (false) {
			if (data.potentialProblems.length) {
				console.log(clc.cyan('\n========== POTENTIAL PROBLEMS ==========\n'));
				_.each(data.potentialProblems, function(row, index){

					console.log(clc.yellow('[' + row.line + ':' + row.column + ']' + ' ' + row.message + '\r'));
				})
			} else {
				console.log(clc.bgGreen('NO POTENTIAL PROBLEMS' + '\r'));
			}
		}

		console.log('==========');
	}
});

'use strict';

var LaunchpadUtil = require('./utils/LaunchpadUtil');

var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');

var uploadPath = path.resolve(path.join(__dirname, '..', '..', 'uploads'));

if (!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath);
}

exports.post = function(req, res) {
	var action = this,
		file = req.file,
		imageId,
		output,
		Launchpad = LaunchpadUtil.getLaunchpad();

	req.pipe(req.busboy);

	req.busboy.on('file', function(fieldname, file, filename) {
		imageId = [uuid.v1(), path.extname(filename)].join('');

		output = fs.createWriteStream(path.join(uploadPath, imageId));

		file.pipe(output);

		output.on('close', function() {
			Launchpad
			.url('http://liferay.io/reviews/data/images')
			.post({
				uuid: imageId
			})
			.then(function(response) {
				var body = response.body();

				if (body.code) {
					res.status(body.code).send(body);
				}
				else {
					res.send(body);
				}
			});
		});
	});
};
'use strict';

var ContextUtil = require('./utils/ContextUtil');

var request = require('request');

var statesURL = 'http://services.groupkt.com/state/get/{country}/all';

exports.get = function(req, res) {
	var action = this,
		country = req.params.country;

	request(
		statesURL.replace('{country}', country),
		function (error, response, body) {
			res.status(response.statusCode);

			if (!error) {
				res.send(body);
			}
		}
	);
};
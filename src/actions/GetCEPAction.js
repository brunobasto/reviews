'use strict';

var request = require('request');

var cepURL = 'https://viacep.com.br/ws/{cep}/json/';

exports.get = function(req, res) {
	var cep = req.params.cep;

	request(
		cepURL.replace('{cep}', cep),
		function (error, response, body) {
			try {
				res.json(JSON.parse(body));
			}
			catch(e) {
				res.status(500);

				res.send('Internal server error');
			}
		}
	);
};
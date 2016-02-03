var request = require('request');

exports.getCountries = function() {
	return new Promise(function(resolve, reject) {
		request(
			'http://services.groupkt.com/country/get/all',
			function(error, response, body) {
				var result = JSON.parse(body).RestResponse.result;

				if (!error) {
					result = result.map(function(item) {
						return {
							name: item.name,
							code: item.alpha3_code
						}
					});

					resolve(result);
				}
				else {
					reject();
				}
			}
		);
	});
};
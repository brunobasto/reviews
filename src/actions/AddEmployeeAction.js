'use strict';

var LaunchpadUtil = require('./utils/LaunchpadUtil');
var ValueUtil = require('./utils/ValueUtil');

var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');
var extend = require('extend');

exports.post = function(req, res) {
	var action = this,
		data = req.body,
		images = [],
		Launchpad = LaunchpadUtil.getLaunchpad();

	extend(
		data,
		{
			price: ValueUtil.getFloat(data.price),
			weight: ValueUtil.getFloat(data.weight)
		}
	);

	Launchpad
	.url('http://liferay.io/reviews/data/employee')
	.post(data)
	.then(function(response) {
		var body = response.body();

		if (body.code) {
			res.redirect('/sell');
		}
		else {
			res.redirect('/');
		}
	});
};
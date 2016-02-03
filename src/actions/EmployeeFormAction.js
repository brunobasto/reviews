'use strict';

var LaunchpadUtil = require('./utils/LaunchpadUtil');

exports.get = function(req, res) {
	var action = this,
		Launchpad = LaunchpadUtil.getLaunchpad();

	var soyContext = {
		applicationDomain: 'reviews.com',
		applicationName: 'Reviews',
		page: 'employee_form',
		title: 'Reviews - Add an employee.'
	};

	Promise.all(
		[
			Launchpad
			.url('http://liferay.io/reviews/data/employee')
			.get()
			.then(function(results) {
				soyContext.employees = results.body();
			})
		]
	).then(function() {
		res.send(action.render('employee_reviews.index', soyContext));
	});
};
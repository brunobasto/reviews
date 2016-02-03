'use strict';

var LaunchpadUtil = require('./utils/LaunchpadUtil');

exports.get = function(req, res) {
	var action = this,
		Launchpad = LaunchpadUtil.getLaunchpad();

	var soyContext = {
		applicationDomain: 'reviews.com',
		applicationName: 'Reviews',
		page: 'home',
		title: 'Reviews'
	};

	Promise.all(
		[
			Launchpad
			.url('http://liferay.io/reviews/data/employee')
			.get()
			.then(function(results) {
				soyContext.employees = results.body();
			}),
			Launchpad
			.url('http://liferay.io/reviews/data/review')
			.get()
			.then(function(results) {
				soyContext.reviews = results.body();
			})
		]
	)
	.then(function() {
		soyContext.context = JSON.stringify(soyContext);

		res.send(action.render('employee_reviews.index', soyContext));
	});
};
var Wirl = require('../data/models/wirl');
var loadWirl = require('./middleware/load_wirl');
var async = require('async');
var maxWirlsPerPage = 10;

module.exports = function(app) {
	app.get('/wirls', function(req, res, next) {
		var page = req.query.page && parseInt(req.query.page, 10) || 0;
		async.parallel([
			function(next) {
				Wirl.count(next);
			},
			function(next) {
				Wirl.find({})
					.sort('title')
					.skip(page * maxWirlsPerPage)
					.limit(maxWirlsPerPage)
					.exec(next);
			}
		],
		function (err, results) {
			if (err) {
				return next(err);
			}
			var count = results[0];
			var wirls = results[1];
			var lastPage = (page + 1) * maxWirlsPerPage >= count;

			res.render('wirls/index', {
																 title: "Wirls",
																 wirls: wirls,
																 page: page,
																 lastPage: lastPage
																});
		});
	});

	app.get('/wirls/new', function(req, res) {
		res.render('wirls/new', {title: "New Wirl"});
	});

	app.get('/wirls/:id', loadWirl, function(req, res, next) {
		if (req.wirl) {
			res.render('wirls/show', {title: "Wirl Profile", wirl: req.wirl});
		} else {
			next();
		}
	});

	app.post('/wirls', function(req, res) {
		Wirl.create(req.body, function(err) {
			if (err) {
				return next(err);
			}
			res.redirect('/wirls');
		});
	});

	app.del('/wirls/:id', loadWirl, function(req, res, next) {
		req.wirl.remove(function(err) {
			if (err) { return next(err); }
			res.redirect('/wirls');
		});
	});
};
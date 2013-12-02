var Wirl = require('../../data/models/wirl');

function loadWirl(req, res, next) {
	Wirl.findOne({_id: req.params.id}, function(err, wirl) {
		if (err) {
			return next(err);
		}
		if (!wirl) {
			return res.send('Not found', 404);
		}
		req.wirl = wirl;
		next();
	});
}

module.exports = loadWirl;
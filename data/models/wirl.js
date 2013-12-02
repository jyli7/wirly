var mongoose = require('mongoose');
var WirlSchema = require('../schemas/wirl');

var Wirl = mongoose.model('Wirl', WirlSchema);

module.exports = Wirl;
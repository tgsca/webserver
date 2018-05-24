var _ = require('underscore');
var fs = require('fs');

/**
 * GET all test status
 */
exports.get = function(req, res, next) {
    var content = fs.readFileSync('./currentStatus.json');
    var teststatus = JSON.parse(content);
    res.jsonp(teststatus);
};
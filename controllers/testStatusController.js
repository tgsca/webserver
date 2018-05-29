require('../models/TestStatus');

var _ = require('underscore');
/* var fs = require('fs'); */
var mongoose = require('mongoose');
var TestStatus = mongoose.model('TestStatus');

/**
 * GET all test status
 */
exports.get = function(req, res, next) {
/*     var content = fs.readFileSync('./currentStatus.json');
    var teststatus = JSON.parse(content);
    res.jsonp(teststatus);
 */
    TestStatus.find().exec(function (err, testStatus) {
        var testStatusList = {};
        var key = 'status';
        testStatusList[key] = [];

        for(var ts in testStatus) {
            var newStatus = {
                testcycle: testStatus[ts]["project"] + " " + testStatus[ts]["cycle"],
                testcases: testStatus[ts]["testcases"] ? testStatus[ts]["testcases"] : 0,
                passed: testStatus[ts]["passed"] ? testStatus[ts]["passed"] : "unknown",
                failed: testStatus[ts]["failed"] ? testStatus[ts]["failed"] : "unknown",
                unexecuted: testStatus[ts]["unexecuted"] ? testStatus[ts]["unexecuted"] : "unknown"
            };

            testStatusList[key].push(newStatus);
        }

        res.jsonp(testStatusList);
    });
};

/**
 * POST a new test status
 */
exports.post = function(req, res, next) {
    var testStatus = new TestStatus(req.body);
    testStatus.save();
    res.jsonp(testStatus);
};
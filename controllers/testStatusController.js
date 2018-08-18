require('../models/TestStatus');

var _ = require('underscore');
var mongoose = require('mongoose');
var TestStatus = mongoose.model('TestStatus');

/**
 * GET all test status
 */
exports.get = function(req, res, next) {
    if (req.query.requestor!=null && req.query.requestor=="magicmirror") {
        TestStatus.find().exec(function (err, testStatus) {
            var testStatusList = {};
            var key = 'status';
            testStatusList[key] = [];
    
            for(var ts in testStatus) {
                var newStatus = {
                    testcycle: testStatus[ts]["project"] + " " + testStatus[ts]["cycle"],
                    testcases: testStatus[ts]["passed"] + testStatus[ts]["failed"] + testStatus[ts]["unexecuted"],
                    passed: testStatus[ts]["passed"] ? testStatus[ts]["passed"] : 0,
                    failed: testStatus[ts]["failed"] ? testStatus[ts]["failed"] : 0,
                    unexecuted: testStatus[ts]["unexecuted"] ? testStatus[ts]["unexecuted"] : 0
                };
    
                testStatusList[key].push(newStatus);
            }
    
            res.jsonp(testStatusList);
        });
    } else {
        TestStatus.find().exec(function (err, testStatus) {
            res.jsonp(testStatus);
        });
    }
};

/**
 * POST a new test status
 */
exports.post = function(req, res, next) {
    var testStatus = new TestStatus(req.body);
    testStatus.save();
    res.jsonp(testStatus);
};

/**
 * UPDATE an existing test status
 */
exports.put = function (req, res, next) {
    TestStatus.load(req.params.statusId, function (err, testStatus) {
        testStatus = _.extend(testStatus, req.body);
        testStatus.save(function (err) {
            res.jsonp(testStatus);
        });
    });
};

/**
 * DELETE an existing test status
 */
exports.delete = function (req, res, next) {
    TestStatus.load(req.params.statusId, function (err, statusId) {
        statusId.remove(function (err) {
            res.jsonp(statusId);
        });
    });
};
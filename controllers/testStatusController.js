require('../models/TestStatus');

var _ = require('underscore');
var mongoose = require('mongoose');
var TestStatus = mongoose.model('TestStatus');

/**
 * GET all test status
 * Query
 */
exports.get = function(req, res, next) {
    if (req.query.requestor!=null && req.query.requestor=="magicmirror") {
        TestStatus.find().exec(function (err, testStatus) {
            var testStatusList = {};
            var key = 'status';
            testStatusList[key] = [];
    
            for(var ts in testStatus) {
                var passed = testStatus[ts]["passed"] ? testStatus[ts]["passed"] : 0;
                var failed = testStatus[ts]["failed"] ? testStatus[ts]["failed"] : 0;
                var blocked = testStatus[ts]["blocked"] ? testStatus[ts]["blocked"] : 0;
                var norun = testStatus[ts]["norun"] ? testStatus[ts]["norun"] : 0;
                var sum = passed + failed + blocked + norun;
                var unit = " (in #)";

                if (req.query.percentage!=null && req.query.percentage==true) {
                    passed = Math.round(passed/sum * 100);
                    failed = Math.round(failed/sum * 100);
                    blocked = Math.round(blocked/sum * 100);
                    norun = Math.round(norun/sum * 100);
                    unit = " (in %)"
                }

                var newStatus = {
                    cycle: testStatus[ts]["project"] + " " + testStatus[ts]["cycle"] + unit,
                    testcount: sum,
                    passed: passed,
                    failed: failed,
                    blocked: blocked,
                    norun: norun
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

    testStatus.save(function (err) {
        if (err) {
            res.status(err.status || 400).send(err.message);
        } else {
            res.jsonp(testStatus);
        }
    });
};

/**
 * UPDATE an existing test status
 */
exports.put = function (req, res, next) {
    TestStatus.load(req.params.statusId, function (err, testStatus) {
        testStatus = _.extend(testStatus, req.body);
        testStatus.save(function (err) {
            if (err) {
                res.status(err.status || 400).send(err.message);
            } else {
                res.jsonp(testStatus);
            }
        });
    });
};

/**
 * DELETE an existing test status
 */
exports.delete = function (req, res, next) {
    TestStatus.findByIdAndRemove(req.params.statusId, function (err, statusId) {
        if (statusId == null) {
            res.status(400).send("Test status with id '" + req.params.statusId + "' could not be found!");
        } else {
            res.send("Test status with id '" + req.params.statusId + "' deleted successfully.");
        }
    });
};
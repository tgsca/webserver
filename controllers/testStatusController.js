// get all documents
exports.get = function (req, res) {
    res.jsonp({
        "status": [
            {
                "testcycle": "CDM Smoke",
                "testcases": "42",
                "passed": "75%",
                "failed": "12%",
                "unexecuted": "13%"
            },
            {
                "testcycle": "Unite Smoke",
                "testcases": "88",
                "passed": "82%",
                "failed": "14%",
                "unexecuted": "2%"
            },
            {
                "testcycle": "CRD Smoke",
                "testcases": "88",
                "passed": "82%",
                "failed": "14%",
                "unexecuted": "2%"
            },
            {
                "testcycle": "Customer Portal Smoke",
                "testcases": "20",
                "passed": "92%",
                "failed": "2%",
                "unexecuted": "6%"
            }
        ]
    });
};

var express = require('express');
var router = express.Router();

var testStatus = require('../controllers/testStatusController');

/* GET /test-status */
router.get('/', testStatus.get);

module.exports = router;
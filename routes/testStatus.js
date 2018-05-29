var express = require('express');
var router = express.Router();

var testStatus = require('../controllers/testStatusController');

/* GET /test-status */
router.get('/', testStatus.get);

/* POST /test-status */
router.post('/', testStatus.post);

module.exports = router;
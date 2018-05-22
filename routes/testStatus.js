var express = require('express');
var router = express.Router();

var testStatus = require('../controllers/testStatusController');

/* GET /testStatus */
router.get('/', testStatus.get);

module.exports = router;

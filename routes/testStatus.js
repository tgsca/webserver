var express = require('express');
var router = express.Router();

var testStatus = require('../controllers/testStatusController');

/* GET /test-status */
router.get('/', testStatus.get);

/* POST /test-status and body: data object */
router.post('/', testStatus.post);

/* PUT /test-status/<id> and body: data object */
router.put('/:statusId', testStatus.put);

/* DELETE /test-status/<id> */
router.delete('/:statusId', testStatus.delete);

module.exports = router;
var express = require('express');
var router = express.Router();

var blogposts = require('../controllers/blogpostsController');

/* GET /blogposts */
router.get('/', blogposts.get);

module.exports = router;
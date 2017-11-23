var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/page', function(req, res, next) {
    res.render('test/test1', { title: 'Express' });
});

module.exports = router;

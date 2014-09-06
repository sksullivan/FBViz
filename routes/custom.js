var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/fb', function(req, res) {
  res.render('fbtest');
});

router.get('/map', function(req, res) {
  res.render('maptest');
});

module.exports = router;

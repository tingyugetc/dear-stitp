var express = require('express');
var router = express.Router();

var user = require('../controllers/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/create_user', user.create_user);

module.exports = router;

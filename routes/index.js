var express = require('express');
var router = express.Router();

var user = require('../controllers/user');
var meeting = require('../controllers/metting');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/create_user', user.create_user);
router.post('/user/login', user.login);

router.post('/meeting/create', meeting.create);
router.get('/meeting/getList', meeting.getList);

module.exports = router;

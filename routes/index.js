var express = require('express');
var router = express.Router();

var authorization = require('../resource/middleware/authorization');
var user = require('../controllers/user');
var meeting = require('../controllers/metting');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/create_user', user.create_user);
router.post('/user/login', user.login);
router.get('/user/user_info', authorization.requireLogin, user.user_info);

router.post('/meeting/create', meeting.create);
router.get('/meeting/findList', meeting.findList);
router.get('/meeting/findStartedList', authorization.requireLogin, meeting.findStartedList);
router.get('/meeting/findJoinedList', authorization.requireLogin, meeting.findJoinedList);

module.exports = router;

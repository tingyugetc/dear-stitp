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
router.get('/user/user_info_copy', user.user_info_copy);

router.post('/meeting/create', meeting.create);
router.get('/meeting/findList', meeting.findList);
router.get('/meeting/findStartedList', authorization.requireLogin, meeting.findStartedList);
router.get('/meeting/findJoinedList', authorization.requireLogin, meeting.findJoinedList);
// router.get('/meeting/joinMeeting', authorization.requireLogin, meeting.joinMeeting);
router.get('/meeting/getMeeting', authorization.requireLogin, meeting.getMeeting);
router.post('/meeting/createSignalId', authorization.requireLogin, meeting.createSignalId);
router.post('/meeting/joinMeeting', authorization.requireLogin, meeting.joinMeeting);
router.post('/meeting/userSign', authorization.requireLogin, meeting.userSign);
router.post('/meeting/userPhoto', authorization.requireLogin, meeting.userPhoto);

module.exports = router;

/**
 * Created by tingyugetc on 17/4/17.
 * 会议控制器
 */

const Meeting = require('../models/metting').Meeting;
const CodeMsg = require('../utils/code').code;
const fs = require('fs');

exports.create = function (req, res, next) {
    var name = req.body.name;
    var start_time = req.body.start_time;
    var location = req.body.location;
    var user = req.session.user;

    if (req.files.length > 0) {
        // 获取文件的临时路径
        var tmp_path = './' + req.files[0].path;
        var target_path = './public/upload/' + req.files[0].originalname;

        fs.rename(tmp_path, target_path, function (err) {
            if (err) throw err;
        });
    } else {
        target_path = '';
    }

    Meeting.create({
        name: name,
        start_time: start_time,
        location: location,
        user: user._id,
        file: target_path
    }, function (err, meeting) {
        if (err) {
            res.json({
                code: err.code,
                message: CodeMsg[err.code] || CodeMsg['500'],
                data: err.message
            });
        } else {
            res.json({
                code: 200,
                message: CodeMsg['200'],
                data: meeting._id
            });
        }
    });
};

exports.findList = function (req, res, next) {
    Meeting.find(
        null, null, {
            limit: 20,
            sort: '-start_time',
            populate: 'user'
        }, function (err, meetings) {
            console.log(meetings);
            res.json({
                code: 200,
                message: CodeMsg['200'],
                data: meetings
            });
        }
    );
};

// 获取我发起的会议列表
exports.findStartedList = function (req, res, next) {
    var user = req.session.user;

    Meeting.find({
        user: user
    }, null, {
        limit: 20,
        sort: '-start_time',
        populate: 'user'
    }, function (err, meetings) {
        meetings.forEach(function (element) {
            element['username'] = element.user.username;
        });
        res.json({
            code: 200,
            message: CodeMsg['200'],
            data: meetings
        });
    });
};

exports.findJoinedList = function (req, res, next) {
    var user = req.session.user;

    Meeting.find({
        user: user
    }, null, {
        limit: 20,
        sort: '-start_time',
        populate: 'user'
    }, function (err, meetings) {
        meetings.forEach(function (element) {
            element['username'] = element.user.username;
        });
        res.json({
            code: 200,
            message: CodeMsg['200'],
            data: meetings
        });
    });
};

exports.getMeeting = function (req, res, next) {
    var meetingId = req.query._id;
    Meeting.findOne({
        _id: meetingId
    }, function (err, meeting) {
        res.json({
            code: 200,
            message: CodeMsg['200'],
            data: meeting
        });
    });
};

// 参加会议
exports.joinMeeting = function (req, res, next) {

};

exports.createSignalId = function (req, res, next) {
	var meetingId = req.body.meetingId;
	var chars = ['0','1','2','3','4','5','6','7','8','9'];
	function suiJi() {
	    var suiji = "";
	    for(var i = 0; i < 6 ; i ++) {
	        var id = Math.ceil(Math.random()*35);
	        suiji += chars[id];
	    }
	    return suiji;
	}

	var signalId = suiJi();
	Meeting.update({
		_id: meetingId
	},function(err, meeting){ 
		res.json({
			code: 200,
			message: CodeMsg['200'],
			data: meeting.signal_id
		});
	});
};
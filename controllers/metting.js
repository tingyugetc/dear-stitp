/**
 * Created by tingyugetc on 17/4/17.
 * 会议控制器
 */

const Meeting = require('../models/metting').Meeting;
const CodeMsg = require('../utils/code').code;
const UserMeeting = require('../models/userMeetings').UserMeeting;
const User = require('../models/user').User;
const fs = require('fs');
const shell = require('shelljs');

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
            // console.log(meetings);
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

    UserMeeting.find({
        user: user
    }, null, {
        limit: 20,
        populate: ['meeting', 'user', 'originator']
    }, function (err, userMeetings) {
        var meetings = userMeetings.map(function (element) {
            var meeting = element.meeting;
            meeting.user = element.originator;
            return meeting;
        });

        res.json({
            code: 200,
            message: CodeMsg['200'],
            data: meetings
        });
    });
};

// 参加会议
exports.joinMeeting = function (req, res, next) {
    var user = req.session.user;
    var meetingId = req.body.meetingId;
    Meeting.findOne({
        _id: meetingId
    }, null, {
        populate: 'user'
    }, function(err, meeting) {
        if (err) {
            res.json({
                code: 200,
                message: CodeMsg['200'],
                data: '404'
            });
        } else {
            UserMeeting.findOne({
                user: user,
                meeting: meeting
            }, function(err, userMeeting) {
                if (userMeeting) {
                    res.json({
                        code: 200,
                        message: CodeMsg['200'],
                        data: '300'
                    });                   
                } else{
                    UserMeeting.create({
                        user: user,
                        meeting: meeting,
                        originator: meeting.user
                    }, function(err, meeting) {
                        if (err) {
                            // console.log("加入失败");
                            res.json({
                                code: 200,
                                message: CodeMsg['200'],
                                data: '11011'
                            });                             
                        } else {
                            // console.log("成功加入");
                            console.log(meeting);
                            res.json({
                                code: 200,
                                message: CodeMsg['200'],
                                data: '200'
                            });                             
                        }

                    });
                }
            });
        }
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



exports.createSignalId = function (req, res, next) {
	var meetingId = req.body.meetingId;
    console.log(meetingId);
    // var isExist = 0;
    function getRandom() {
        var chars = '0123456789';
        var random = '';
        for(var i = 0; i < 6; i ++) {
            var id = Math.ceil(Math.random() * 9);
            random += chars[id];
        }
        return random;
    }

    var signalId = getRandom();
    console.log(signalId);

    Meeting.findOne({
        _id: meetingId
    }, function (err, meeting) {
        if (err) {
            // meeting.save({_id: meetingId,signal_id: signalId});
            // res.json({
            //     code: 200,
            //     message: CodeMsg['200'],
            //     data: meeting.signal_id
            // });
        }

        if (meeting.signal_id === '') {
            // 就是signal_id没有，为空
            meeting.signal_id = signalId;
            meeting.save();
        }
        res.json({
            code: 200,
            message: CodeMsg['200'],
            data: meeting.signal_id
        });           

    });
};

exports.userSign = function (req, res, next) {
    var user = req.session.user;
    var meetingId = req.body._id;
    if (req.files.length > 0) {
        console.log('get the file ' + req.files[0].originalname);

        // 获取文件的临时路径
        var tmp_path = './' + req.files[0].path;
        var target_path = './public/upload/' + req.files[0].originalname;

        fs.rename(tmp_path, target_path, function (err) {
            if (err) throw err;
        });
    } else {
        res.json({
            code: 10104,
            message: CodeMsg['10104'],
            date: ''
        });
    }

    var result = shell.exec('cd /root/code/Seetaface/SeetaFaceEngine/FaceIdentification && ./build000/src/test/test_face_recognizer.bin /home/dear-stitp/public/upload/' + req.files[0].originalname);
    result = result.split('\n');
    console.log(result[result.length - 2]);

    res.json({
        code: 200,
        message: CodeMsg['200'],
        data: ''
    })

};

exports.userPhoto = function (req, res, next) {
    // body...
    var resultPhoto = req.body.file[0];


}

exports.meetingMessage = function (req, res, next) {
    // var meetingmessage = req.body.message;
    // var userid = req.body.userId;
    var meetingid = req.body.meetingId;
    Meeting.findOne({
        _id: meetingid
    }, function (err, meeting) {
        UserMeeting.find({
            meeting:meeting
        }, function (err, meetings) {
            if(err) {
                res.json({
                    code:10104,
                    message: CodeMsg['10104'],
                    data:''
                })
            }
            else{
                res.json({
                    code: 200,
                    message: CodeMsg[200],
                    data: meetings
                })
            }
        });
    });

};

exports.AddMeetingMessage = function (req, res, next) {

};

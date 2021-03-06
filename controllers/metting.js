/**
 * Created by tingyugetc on 17/4/17.
 * 会议控制器
 */

const Meeting = require('../models/metting').Meeting;
const CodeMsg = require('../utils/code').code;
const UserMeeting = require('../models/userMeetings').UserMeeting;
const User = require('../models/user').User;
const UserPersonInfo = require('../models/userPersonInfo').UserPersonInfo;
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
        if (err) {
            res.json({
                code: 500,
                message: CodeMsg['500'],
                data: ''
            });
        } else if (meetings.length > 0) {
            meetings.forEach(function (element) {
                element['username'] = element.user.username;
            });
            res.json({
                code: 200,
                message: CodeMsg['200'],
                data: meetings
            });
        } else {
            res.json({
                code: 200,
                message: CodeMsg['200'],
                data: []
            });
        }

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
        if (err) {
            res.json({
                code: 500,
                message: CodeMsg['500'],
                data: ''
            });
        } else if (userMeetings.length > 0) {
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
        } else {
            res.json({
                code: 200,
                message: CodeMsg['200'],
                data: []
            });
        }

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
    var userId = req.body.user_id;
    var meetingId = req.body._id;
    var code = req.body.code;

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
        return;
    }

    var result = shell.exec('cd /root/code/Seetaface/SeetaFaceEngine/FaceIdentification && ./build000/src/test/test_face_recognizer.bin /home/dear-stitp/public/upload/' + req.files[0].originalname);
    var resultStd = result.stderr;
    var pat = new RegExp('success');
    if (pat.test(resultStd) === true) {
        result = result.split('\n');
        phpoto = result[result.length - 2];
        var photoId = /\d+/.exec(phpoto)[0];
        console.log(photoId);
        var maxSimilarity = result[42 + parseInt(photoId) - 1];
        if (maxSimilarity < 0.5) {
            res.json({
                code: 10109,
                message: CodeMsg['10109'],
                data: ''
            });
            return;
        }

        UserPersonInfo.findOne({
            photo_id: photoId
        }, null, {
            populate: 'user'
        }, function (err, userPersonInfo) {
            if (err) {
                res.json({
                    code: 500,
                    message: CodeMsg['500'],
                    data: ''
                });
            } else {
                if (userPersonInfo && userPersonInfo.user._id == userId) {
                    Meeting.findOne({
                        _id: meetingId
                    }, function (err, meeting) {
                        if (meeting.signal_id != code) {
                            res.json({
                                code: 10107,
                                message: CodeMsg['10107'],
                                data: ''
                            });
                            return;
                        }

                        UserMeeting.findOne({
                            meeting: meeting,
                            user: userPersonInfo.user
                        }, function (err, userMeeting) {
                            if (err) {
                                res.json({
                                    code: 500,
                                    message: CodeMsg['500'],
                                    data: ''
                                });
                            } else if (userMeeting) {
                                userMeeting.signalDate = new Date();
                                userMeeting.save();

                                res.json({
                                    code: 200,
                                    message: CodeMsg['200'],
                                    data: ''
                                });
                            } else {
                                res.json({
                                    code: 404,
                                    message: CodeMsg['404'],
                                    data: ''
                                });
                            }
                        });
                    });
                } else {
                    res.json({
                        code: 10105,
                        message: CodeMsg['10105'],
                        data: ''
                    });
                }
            }
        });
    } else {
        res.json({
            code: 10108,
            message: CodeMsg['10108'],
            data: ''
        });
    }

};

exports.userSignalList = function (req, res, next) {
    var meetingid = req.body.meetingId;
    Meeting.findOne({
        _id: meetingid
    }, function (err, meeting) {
        UserMeeting.find({
            meeting:meeting,
            signalDate: {$gt: new Date(1970)}
        }, null, {
            populate: 'user'
        }, function (err, meetings) {
            if(err) {
                res.json({
                    code:10104,
                    message: CodeMsg['10104'],
                    data:''
                })
            } else{
                console.log(meetings);
                res.json({
                    code: 200,
                    message: CodeMsg[200],
                    data: meetings
                })
            }
        });
    });
};

exports.userPhoto = function (req, res, next) {
    // body...
    var resultPhoto = req.body.file[0];
};

exports.meetingMessage = function (req, res, next) {
    // var meetingmessage = req.body.message;
    // var userid = req.body.userId;
    var meetingId = req.body.meeting_id;
    Meeting.findOne({
        _id: meetingId
    }, function (err, meeting) {
        UserMeeting.find({
            meeting: meeting
        }, null, {
            populate: 'user'
        }, function (err, meetings) {
            if(err) {
                res.json({
                    code: 10104,
                    message: CodeMsg['10104'],
                    data:''
                });
            } else{
                res.json({
                    code: 200,
                    message: CodeMsg[200],
                    data: meetings
                });
            }
        });
    });

};

exports.AddMeetingMessage = function (req, res, next) {
    var meetingId = req.body.meeting_id;
    var user = req.session.user;
    var message = req.body.message;

    Meeting.findOne({
        _id: meetingId
    }, function(err, meeting) {
        UserMeeting.findOne({
            meeting: meeting,
            user: user
        }, function(err, userMeeting) {
            if (userMeeting) {
                userMeeting.message = message;
                userMeeting.save();

                res.json({
                    code: 200,
                    message: CodeMsg['200'],
                    data: ''
                });
            }
        });
    });
};

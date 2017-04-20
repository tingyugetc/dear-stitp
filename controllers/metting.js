/**
 * Created by tingyugetc on 17/4/17.
 * 会议控制器
 */

const Meeting = require('../models/metting').Meeting;
const CodeMsg = require('../utils/code').code;

exports.create = function (req, res, next) {
    // todo 上传会议文件
    var name = req.body.name;
    var start_time = req.body.start_time;
    var location = req.body.location;
    var user = req.session.user;

    Meeting.create({
        name: name,
        start_time: start_time,
        location: location,
        user: user
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
            sort: '-start_time'
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
        sort: '-start_time'
    }, function (err, meetings) {
        res.json({
            code: 200,
            message: CodeMsg['200'],
            date: meetings
        });
    });
};

exports.findJoinedList = function (req, res, next) {
    var user = req.session.user;

    Meeting.find({
        user: user
    }, null, {
        limit: 20,
        sort: '-start_time'
    }, function (err, meetings) {
        res.json({
            code: 200,
            message: CodeMsg['200'],
            data: meetings
        });
    });
};

exports.getMeeting = function (req, res, next) {

};

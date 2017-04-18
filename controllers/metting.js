/**
 * Created by tingyugetc on 17/4/17.
 * 会议控制器
 */

const Meeting = require('../models/metting').Meeting;

exports.create = function (req, res, next) {
    var name = req.body.name;
    var start_time = req.body.start_time;
    var location = req.body.location;
    var user = req.session.user;

    Meeting.create({

    }, function (err, meeting) {

    });

    console.log(req.session);
    res.json({
        status: 'ok'
    })
};

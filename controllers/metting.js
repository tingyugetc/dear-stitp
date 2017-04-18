/**
 * Created by tingyugetc on 17/4/17.
 * 会议控制器
 */

exports.create = function (req, res, next) {
    var name = req.body.name;
    var start_time = req.body.start_time;
    var location = req.body.location;

    console.log(req.session);
    res.json({
        status: 'ok'
    })
};

/**
 * Created by tingyugetc on 17/4/20.
 */

exports.requireLogin = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.json({

        });
    }
};

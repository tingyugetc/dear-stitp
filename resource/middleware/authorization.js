/**
 * Created by tingyugetc on 17/4/20.
 */

const CodeMsg = require('../../utils/code').code;

exports.requireLogin = function (req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.json({
            code: 10102,
            message: CodeMsg['10102'],
            data: ''
        });
    }
};

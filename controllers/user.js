/**
 * Created by tingyugetc on 17/4/10.
 */

const CodeMsg = require('../utils/code').code;
const User = require('../models/user').User;


exports.create_user = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    // todo 密码需要加密
    // todo 撒盐加密
    console.log(username, password);

    User.create({
            username: username,
            password: password
        }, function (err) {
            if (err) {
                console.log(err);
                return res.json({
                    code: err.code,
                    message: CodeMsg[err.code] || CodeMsg['500'],
                    data: ''
                });
            } else {
                return res.json({
                    code: 200,
                    message: CodeMsg['200'],
                    data: ''
                });
            }
        }
    );
};

exports.login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne(
        {
            username: username,
            password: password
        },
        function (err, user) {
            if (err) {
                return res.json({
                    code: err.code,
                    message: CodeMsg[err.code] || CodeMsg['500'],
                    data: ''
                });
            } else {
                if (user) {
                    console.log(user);
                    return res.json({
                        code: 200,
                        message: CodeMsg['200'],
                        data: user.username
                    });
                } else {
                    return res.json({
                        code: 404,
                        message: CodeMsg['404'],
                        data: ''
                    });
                }
            }
        }
    );

    // 可以使用 co 的库来实现异步编程 http://mongoosejs.com/docs/promises.html
    // User.findOne({username: username}).then(function (user) {
    //     console.log(user);
    //     console.log(user.username);
    // });

    // res.json({
    //     message: 'success'
    // });
};


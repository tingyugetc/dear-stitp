/**
 * Created by tingyugetc on 17/4/10.
 * 用户控制器
 */

const CodeMsg = require('../utils/code').code;
const User = require('../models/user').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.create_user = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    bcrypt.hash(password, saltRounds, function (err, hash) {
        console.log(hash);
        User.create({
                username: username,
                password: hash
            }, function (err, user) {
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
                        data: user._id
                    });
                }
            }
        );
    });

};

exports.login = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne(
        {
            username: username
        },
        function (err, user) {
            if (err) {
                res.json({
                    code: err.code,
                    message: CodeMsg[err.code] || CodeMsg['500'],
                    data: err.message
                });
            } else {
                if (user) {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (result === true) {
                            req.session.user = user;
                            res.json({
                                code: 200,
                                message: CodeMsg['200'],
                                data: user.username
                            });
                        } else {
                            res.json({
                                code: 10101,
                                message: CodeMsg['10101'],
                                data: ''
                            });
                        }
                    });
                } else {
                    res.json({
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

exports.user_info = function (req, res, next) {
    var user_id = req.body.user_id || 0;
    console.log(user_id);
    if (user_id === 0) {
        // 查看自己的信息
        res.json({
            code: 200,
            message: CodeMsg['200'],
            data: req.session.user
        })
    } else {
        // 查看他人的信息
        User.find({
            _id: user_id
        }, function (err, user) {
            if (err) {
                res.json({
                    code: err.code,
                    message: err.message,
                    data: ''
                });
            } else if (user) {
                res.json({
                    code: 200,
                    message: CodeMsg['200'],
                    data: user
                })
            } else {
                res.json({
                    code: 10103,
                    message: CodeMsg['10103'],
                    data: ''
                });
            }
        });
    }
};

/**
 * Created by tingyugetc on 17/4/10.
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
            }, function (err) {
                if (err) {
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
    });

};

exports.login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;


    User.findOne(
        {
            username: username
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
                    bcrypt.compare(password, user.password, function (err, res) {
                        if (res === true) {
                            return res.json({
                                code: 200,
                                message: CodeMsg['200'],
                                data: user.username
                            });
                        }
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


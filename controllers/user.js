/**
 * Created by tingyugetc on 17/4/10.
 */

const CodeMsg = require('../utils/code').code;
const User = require('../models/user').User;


exports.create_user = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username, password);

    User.create({
            username: username,
            password: password
        }, function (err) {
            if (err) {
                console.log(err);
                return res.json({
                    code: err.code,
                    message: CodeMsg[err.code] || CodeMsg['500']
                });
            } else {
                return res.json({
                    code: 200,
                    message: CodeMsg['200']
                });
            }
        }
    );
};

exports.get_user = function (req, res) {
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
                    message: CodeMsg[err.code] || CodeMsg['500']
                });
            } else {
                if (user) {
                    console.log(user);
                    return res.json({
                        code: 200,
                        message: user.username
                    });
                } else {
                    return res.json({
                        code: 404,
                        message: CodeMsg['404']
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











/**
 * Created by tingyugetc on 2017/5/9.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPersonInfoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    name: {
        // 姓名
        type: String,
        default: '',
        require: true
    },
    nick_logo: {
        // 头像
        type: String,
        default: '',
        require: true
    },
    title: {
        // 职称
        type: String,
        default: '',
        require: true
    },
    gender: {
        // 性别
        type: String,
        default: '男',
        require: true
    },
    degree: {
        // 学位
        type: String,
        default: '',
        require: true
    },
    degree_level: {
        // 学历
        type: String,
        default: '',
        require: true
    },
    email: {
        type: String,
        default: '',
        require: true
    },
    organization: {
        //所在单位
        type: String,
        default: '',
        require: true
    },
    resume: {
        // 个人简介
        type: String,
        default: '',
        require: true
    },
    area: {
        // 研究方向
        type: String,
        default: '',
        require: true
    },
    photo_id: {
        type: Number,
        default: 0
    }
});

exports.UserPersonInfo = mongoose.model('UserPersonInfo', UserPersonInfoSchema);

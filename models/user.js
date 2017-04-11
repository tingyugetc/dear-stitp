/**
 * Created by tingyugetc on 17/4/10.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        default: '',
        require: true,
        unique: true
    },
    password: {
        type: String,
        default: '',
        require: true
    }
});

mongoose.model('User', UserSchema);

/**
 * Created by tingyugetc on 17/4/18.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
    // todo meeting model
    name: {
        type: String,
        default: ''
    },
    meeting_time: {
        type: String,
        default: '',
        require: true,
        unique: true
    },
    location: {
        type: String,
        default: '',
        require: true
    }
});

exports.Meeting = mongoose.model('Meeting', MeetingSchema);
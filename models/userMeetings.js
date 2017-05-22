// UserMeetings.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserMeetingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    meeting: {
    	type: Schema.Types.ObjectId,
    	ref: 'Meeting',
    	require: true
    },
    originator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    message: {
        type: String,
        default: ''
    },
    signalDate : {
        type: Date,
        default: new Date(1970)
    }
});

exports.UserMeeting = mongoose.model('UserMeeting', UserMeetingSchema);
// userMeetings.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userMeetings = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    meetings: {
    	type: Schema.Types.ObjectId,
    	ref: 'Meeting',
    	require: true
    }
});

exports.userMeetings = mongoose.model('userMeetings', userMeetings);
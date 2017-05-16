/**
 * Created by tingyugetc on 17/4/18.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
    // todo meeting model
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    name: {
        type: String,
        default: '',
        require: true
    },
    start_time: {
        type: String,
        default: '',
        require: true
    },
    location: {
        type: String,
        default: '',
        require: true
    },
    file: {
        type: String,
        default: ''
    },
    signal_id: {
    	type: String,
    	default: ''
    }
});

exports.Meeting = mongoose.model('Meeting', MeetingSchema);

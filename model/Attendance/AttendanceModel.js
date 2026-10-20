const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({

    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Present'
    }
    
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;

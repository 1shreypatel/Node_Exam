const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String
    }
    
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;

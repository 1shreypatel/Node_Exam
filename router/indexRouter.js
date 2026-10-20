const express = require('express');
const facultyRouter = require('./faculty/facultyRouter');
const attendanceRouter = require('./attendance/attendanceRouter');

const router = express.Router();

router.use('/faculty', facultyRouter);

router.use('/attendance', attendanceRouter);

module.exports = router;

const express = require('express');
const { markAttendance, getTodayAttendance, getAttendanceByDate, getAllAttendance } = require('../../controller/attendance/attendance');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/mark', authMiddleware, markAttendance);
router.get('/today', authMiddleware, getTodayAttendance);
router.get('/date', authMiddleware, getAttendanceByDate);
router.get('/all', authMiddleware, getAllAttendance);

module.exports = router;

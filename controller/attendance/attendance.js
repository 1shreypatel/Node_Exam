const Attendance = require('../../model/Attendance/AttendanceModel');

const markAttendance = async (req, res) => {
    try {
        const { date, status } = req.body;

        const attendanceDate = date || new Date().toISOString().slice(0, 10);

        const existing = await Attendance.findOne({
            facultyId: req.faculty.id,
            date: attendanceDate
        });

        if (existing) {
            return res.status(400).json({ message: 'Attendance already marked for today' });
        }

        const attendance = await Attendance.create({
            facultyId: req.faculty.id,
            date: attendanceDate,
            status: status || 'Present'
        });

        return res.status(201).json({ message: 'Attendance marked successfully', attendance });

    } catch (error) {
        return res.status(500).json({ message: 'Error marking attendance', error: error.message });
    }
};

const getTodayAttendance = async (req, res) => {
    try {
        const today = new Date().toISOString().slice(0, 10);

        const attendance = await Attendance.find({ date: today }).populate('facultyId', 'name email department');

        return res.status(200).json({ date: today, attendance });

    } catch (error) {
        return res.status(500).json({ message: 'Error getting today attendance', error: error.message });
    }
};

const getAttendanceByDate = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: 'Date query parameter is required (YYYY-MM-DD)' });
        }

        const attendance = await Attendance.find({ date }).populate('facultyId', 'name email department');

        return res.status(200).json({ date, count: attendance.length, attendance });

    } catch (error) {
        return res.status(500).json({ message: 'Error getting attendance by date', error: error.message });
    }
};

const getAllAttendance = async (req, res) => {
    try {

        const attendance = await Attendance.find().populate('facultyId', 'name email department');

        return res.status(200).json({ attendance });
        
    } catch (error) {
        return res.status(500).json({ message: 'Error getting all attendance', error: error.message });
    }
};

module.exports = {markAttendance,getTodayAttendance,getAttendanceByDate,getAllAttendance};
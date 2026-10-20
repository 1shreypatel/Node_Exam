const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Faculty = require('../../model/Faculty/FacultyModel');

const registerController = async (req, res) => {
    try {
        const { name, email, password, department } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await Faculty.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newFaculty = await Faculty.create({
            name,
            email,
            password: hashedPassword,
            department
        });

        return res.status(201).json({ message: 'Faculty registered successfully', faculty: newFaculty });
    } catch (error) {
        return res.status(500).json({ message: 'Error registering faculty', error: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        const faculty = await Faculty.findOne({ email });

        if (!faculty) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, faculty.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: faculty._id, email: faculty.email, name: faculty.name },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({ message: 'Login successful', token, faculty });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

const getProfileController = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.faculty.id).select('-password');
        
        return res.status(200).json({ faculty });
    } catch (error) {
        return res.status(500).json({ message: 'Error getting profile', error: error.message });
    }
};

module.exports = { registerController, loginController, getProfileController };
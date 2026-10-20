const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.faculty = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;

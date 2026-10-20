const express = require('express');
const { registerController, loginController, getProfileController } = require('../../controller/auth/auth');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile', authMiddleware, getProfileController);

module.exports = router;

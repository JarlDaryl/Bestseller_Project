const router = require('express').Router();
const { sendEmail } = require('../services/emailService');
const { resetPassword } = require('../controllers/PasswordController');

router.post('/sendEmail', sendEmail)
router.post('/resetPassword', resetPassword)

module.exports = router;
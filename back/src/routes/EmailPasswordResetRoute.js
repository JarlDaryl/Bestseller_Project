const router = require('express').Router();
const { sendEmail } = require('../services/emailService');

router.post('/sendEmail', sendEmail)

module.exports = router;
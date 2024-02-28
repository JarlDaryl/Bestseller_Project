const router = require('express').Router();
const { signup, login, refreshToken} = require('../controllers/LoginController')

router.post('/signup', signup)
router.post('/login',login)
router.get('/refreshToken',refreshToken)

module.exports = router;
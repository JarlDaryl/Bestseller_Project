const router = require('express').Router();
const { signup, login, refreshToken, verifyLogin} = require('../controllers/LoginController')

router.post('/signup', signup)
router.post('/login',login)
router.post('/verifyLogin', verifyLogin)
router.get('/refreshToken',refreshToken)

module.exports = router;
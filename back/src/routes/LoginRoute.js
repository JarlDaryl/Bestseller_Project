const router = require('express').Router();
const { signup, login} = require('../controllers/LoginController')

router.post('/signup', signup)
router.post('/login',login)

module.exports = router;
const router = require('express').Router();
const {getUserById} = require('../controllers/UsersController')


router.get('/:id', getUserById)

module.exports = router;
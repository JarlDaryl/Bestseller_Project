const {getUsers, getUserById, loadData} = require('../controllers/UsersController')
const router = require('express').Router();

router.get('/', getUsers)
router.get('/loadData', loadData)
router.get('/:id', getUserById)

module.exports = router;
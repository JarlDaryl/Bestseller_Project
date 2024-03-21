const {getUsers, getUserById, loadData, changeEmail} = require('../controllers/UsersController')
const router = require('express').Router();

router.get('/', getUsers)
router.get('/loadData', loadData)
router.get('/getUserById/:id', getUserById);
router.post('/changeEmail', changeEmail);

module.exports = router;
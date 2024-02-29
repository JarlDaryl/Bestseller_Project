const { getOrders, getOrdersByUser } = require('../controllers/ProductsController');
const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

router.get('/', getOrders)
router.get('/getOrdersByUser', verifyToken, getOrdersByUser)

module.exports = router;
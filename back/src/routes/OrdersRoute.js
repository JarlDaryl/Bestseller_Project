const { getOrders, getOrdersByUser } = require('../controllers/OrdersController');
const router = require('express').Router();
const verifyToken = require('../middleware/auth');

router.get('/', getOrders)
router.get('/getOrdersByUser', verifyToken, getOrdersByUser)

module.exports = router;
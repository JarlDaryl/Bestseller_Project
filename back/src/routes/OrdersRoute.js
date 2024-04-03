const { getOrders, getOrdersByUser, loadOrdersData, updateOrder } = require('../controllers/OrdersController');

const router = require('express').Router();

const verifyToken = require('../middleware/auth');

router.get('/', getOrders)
router.get('/getOrdersByUser/:userId', verifyToken, getOrdersByUser)
router.get('/loadOrdersData', loadOrdersData)
router.put('/updateOrder/:orderId',verifyToken, updateOrder)

module.exports = router;
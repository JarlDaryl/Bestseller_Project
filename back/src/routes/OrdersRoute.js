const { getOrders, getOrdersByUser, loadOrdersData } = require('../controllers/OrdersController');
const router = require('express').Router();
const verifyToken = require('../middleware/auth');

router.get('/', getOrders)
router.get('/getOrdersByUser', getOrdersByUser)
router.get('/loadOrdersData', loadOrdersData)

module.exports = router;
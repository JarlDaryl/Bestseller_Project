const { getProducts, loadData } = require('../controllers/ProductsController');
const router = require('express').Router();


router.get('/', getProducts)
router.post('/loadData', loadData)


module.exports = router;
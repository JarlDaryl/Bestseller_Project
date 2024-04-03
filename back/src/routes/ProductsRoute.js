const { getProducts, loadData, suggestProductChanges } = require('../controllers/ProductsController');
const router = require('express').Router();

router.get('/', getProducts)
router.get('/loadData', loadData)
router.get('/suggestedProducts/:productId', suggestProductChanges)

module.exports = router;
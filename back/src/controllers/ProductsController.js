const productsDB = require("../mocks/ProductsDB")
const productModel = require("../models/ProductsModel")

const getProducts = async (req, res) => {
    try {

        const allProducts = await productModel.find()
        const resProduct = allProducts.map(product => {
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                category: product.category,
                color: product.color,
                size: product.size,
            }
        })
        res.status(200).json({
            status: 'succeeded',
            data: resProduct,
            error: null
        })

    } catch (error) {
        res
            .status(500)
            .json({ status: "failed", data: null, error: error.message });
    }
}

module.exports = {
    getProducts,
}
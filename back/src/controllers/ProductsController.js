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
                gender: product.gender,
                brand: product.brand,
                quantity: product.quantity,
                provider: product.provider,
                deliveryDate: product.deliveryDate,
                price: product.price,
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

const loadData = async (req, res) => {
    try {

        await Promise.all(productsDB.map(async (product) => {
            const newProduct = productModel({
                name: product.name,
                description: product.description,
                category: product.category,
                color: product.color,
                size: product.size,
                gender: product.gender,
                brand: product.brand,
                quantity: product.quantity,
                provider: product.provider,
                deliveryDate: product.deliveryDate,
                price: product.price,
            })
           
        }));

        try {
             await newProduct.save()
        } catch (error) {
            if (error.code === 11000) {
            return res
                .status(409)
                .json({ status: "failed", data: null, error: "The email already exists" });
        }
        }

        res.send("Data loaded successfully")
    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            status: "error",
            data: null,
            error: "Internal server error",
        });
    }
}



module.exports = {
    getProducts,
    loadData,
}
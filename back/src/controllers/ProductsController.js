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
                price: product.price,
                img: product.img,
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
                price: product.price,
                img: product.img,
            });

            try {
                await newProduct.save();
            } catch (error) {
                if (error.code === 11000) {
                    return res.status(409).json({ status: "failed", data: null, error: "The product already exists" });
                }
            }
        }));

        res.send("Products data loaded successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", data: null, error: "Internal server error" });
    }
};


// const suggestProductChanges = async (req, res) => {
//     try {
//         const { productId, changes } = req.body;
//         const product = await productModel.findById(productId);

//         if (!product) {
//             return res.status(404).json({ status: "failed", data: null, error: "Product not found" });
//         }

//         // Apply the suggested changes to the product
//         Object.assign(product, changes);
//         await product.save();

//         res.status(200).json({ status: "succeeded", data: product, error: null });
//     } catch (error) {
//         res.status(500).json({ status: "failed", data: null, error: error.message });
//     }
// };

const suggestProductChanges = async (req, res) => {
    try {
        const { categoryId } = req.body;
        const similarProducts = await productModel.find({ category: categoryId });

        res.status(200).json({ status: "succeeded", data: similarProducts, error: null });
    } catch (error) {
        res.status(500).json({ status: "failed", data: null, error: error.message });
    }
};


module.exports = {
    getProducts,
    loadData,
    suggestProductChanges,
}
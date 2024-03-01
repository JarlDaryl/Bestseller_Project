const ordersDB = require("../mocks/OrdersDB")
const ordersModel = require("../models/OrdersModel")

const getOrders = async (req, res) => {
    try {

        const allOrders = await ordersModel.find()
        const resOrder = allOrders.map(order => {
            return {
                products: order.products,
                deliveryDate: order.deliveryDate,
                status: order.status,
                total: order.total
            }
        })
        res.status(200).json({
            status: 'succeeded',
            data: resOrder,
            error: null
        })

    } catch (error) {
        res
            .status(500)
            .json({ status: "failed", data: null, error: error.message });
    }
}


const getOrdersByUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const ordersUser = await ordersModel.find({});
        const userOrders = ordersUser.filter((order) => order.users.includes(userId));

        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).json({ message: 'Error to get users orders', error: error.message });
    }
}

const loadOrdersData = async (req, res) => {
    try {
        await Promise.all(ordersDB.map(async (order) => {
            const newOrder = productModel({
                products: order.products,
                quantity: order.quantity,
                deliveryDate: product.deliveryDate,
                status: order.status,
                total: order.total,
            });

            try {
                await newOrder.save();
            } catch (error) {
                if (error.code === 11000) {
                    return res.status(409).json({ status: "failed", data: null, error: "The order already exists" });
                }
            }
        }));

        res.send("Orders data loaded successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", data: null, error: "Internal server error" });
    }
};

module.exports = {
    getOrdersByUser,
    getOrders,
    loadOrdersData,
}
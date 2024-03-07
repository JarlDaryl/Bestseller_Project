const ordersDB = require("../mocks/OrdersDB")
const ordersModel = require("../models/OrdersModel")

const getOrders = async (req, res) => {
    try {

        const allOrders = await ordersModel.find()
        const resOrder = allOrders.map(order => {
            return {
                products: order.products,
                deliveryDate: order.deliveryDate,
                status: order.status
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
        const userId = req.params.userId;
        const userOrders = await ordersModel.find({ user: userId }).populate('products.productId');

        if (!userOrders || userOrders.length === 0) {
            return res.status(404).json({ message: 'No orders found for the user' });
        }

        res.status(200).json(userOrders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Error fetching user orders', error: error.message });
    }
}


const loadOrdersData = async (req, res) => {
    let errors = [];

    try {
        await Promise.all(ordersDB.map(async (order) => {
            // Checks if each product has a 'product' field
            const allProductsHaveProductField = order.products.every(product => 'productId' in product && 'quantity' in product);

            if (!allProductsHaveProductField) {
                errors.push(`Order ${order.id} has one or more products without the "product" field.`);
            } else {
                const newOrder = ordersModel({
                    user: order.user,
                    products: order.products,
                    quantity: order.quantity,
                    deliveryDate: order.deliveryDate,
                    status: order.status,
                });

                try {
                    await newOrder.save();
                } catch (error) {
                    if (error.code === 11000) {
                        errors.push(`Order ${order.id} already exists.`);
                    } else {
                        errors.push(`Error saving order ${order.id}: ${error.message}`);
                    }
                }
            }
        }));

        if (errors.length > 0) {
            res.status(500).json({ status: "error", data: null, error: errors.join(' ') });
        } else {
            res.send("Orders data loaded successfully");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", data: null, error: "Internal server error" });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const newOrderData = req.body;
        const updatedOrder = await updateOrderInDatabase(orderId, newOrderData);

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Failed to update order:', error);
        res.status(500).json({ message: 'Failed to update order' });
    }
}

module.exports = {
    getOrdersByUser,
    getOrders,
    loadOrdersData,
    updateOrder,
}
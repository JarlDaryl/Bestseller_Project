const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to user model
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to product model
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'inTransit', 'delivered', 'cancelled'],
        default: 'pending',
    },
    total: {
        type: Number,
        required: true,
    },
});

const Order = mongoose.model('Order', ordersSchema, "Orders");

module.exports = Order;
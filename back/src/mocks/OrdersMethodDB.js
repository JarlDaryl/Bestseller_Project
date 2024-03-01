const ordersDB = require("./OrdersDB")

const find = (id) => {
    if (!id) {
        console.log(ordersDB)
        return ordersDB
    } else {
        const order = ordersDB.find(d => d.id == id)
        return order
    }
}

const newOrderModel = (user, products, createdAt, deliveryDate, status, total) => {
    ordersDB.push({
        user, products, createdAt, deliveryDate, status, total
    })
}

module.exports = { find, newOrderModel }
const productsDB = require("./ProductsDB")

const find = (id) => {
    if (!id) {
        console.log(productsDB)
        return productsDB
    } else {
        const product = productsDB.find(d => d.id == id)
        return product
    }
}

const newProductModel = (name, description, category, color, size, gender, brand, quantity,  price, img, viable) => {
    productsDB.push({
        name, description, category, color, size, gender, brand, quantity, price, img, viable
    })
}

module.exports = { find, newProductModel }
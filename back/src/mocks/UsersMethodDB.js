const usersDB = require("./UsersDB")

const find = (id) => {
    if (!id) {
        console.log(usersDB)
        return usersDB
    } else {
        const user = usersDB.find(d => d.id == id)
        return user
    }
}


const newUserModel = (id, email, password, companyName, country) => {
    donutsDB.push({
        id, email, password, companyName, country
    })
}


module.exports = { find, newUserModel }
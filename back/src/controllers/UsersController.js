const usersDB = require("../mocks/UsersDB")
const userModel = require("../models/UsersModel")

const getUsers = async (req, res) => {
    try {

        const allUsers = await userModel.find()
        const resUser = allUsers.map(user => {
            return {
                id: user.id,
                email: user.email,
                password: user.password,
                companyName: user.companyName,
                country: user.country,
            }
        })
        res.status(200).json({
            status: 'succeeded',
            data: resUser,
            error: null
        })

    } catch (error) {
        res
            .status(500)
            .json({ status: "failed", data: null, error: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await userModel.findById(id)
        console.log(user)
        res.status(200).json({
            status: 'succeeded',
            data: user,
            error: null
        })

    } catch (error) {
        res
            .status(500)
            .json({ status: "failed", data: null, error: error.message });
    }
}

module.exports = { 
    getUsers, 
    getUserById,
}
const userModel = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/utils");

//Create user with an encrypted password
const signup = async (req, res) => {
    try {
        const user = new userModel({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            companyName: req.body.companyName,
            country: req.body.country,
        });
        
        try {
            await user.save();
        } catch (saveError) {

             if (saveError.code === 11000) {
            return res
                .status(409)
                .json({ status: "failed", data: null, error: "El correo ya existe" });
        }
        }

        res.status(200).json({ status: "succeeded", user, error: null });
    } catch (error) {
        console.log(error)

        if (error.message.includes("data and salt arguments required")) {
            return res
                .status(404)
                .json({ status: "Failed", data: null, error: error.message });
        }

        res
            .status(404)
            .json({ status: "Failed", data: null, error: error.message });
    }
}


const login = async (req, res) => {
    try {
        const data = await userModel.findOne({ email: req.body.email });
        if (data) {
            const validPassword = await bcrypt.compare(req.body.password, data.password);
            console.log(validPassword)
            if (validPassword) {
                try {
                    const user = { userId: data.id, email: data.email, password: data.password};
                    const token = generateToken(user, false);
                    const refreshToken = generateToken(user, true);

                    res.status(200).json({
                        status: "succeeded",
                        data: {
                            id: data._id,
                            email: data.email,
                            companyName: data.companyName,
                            country: data.country,
                            token,
                            refreshToken,
                        },
                        error: null,
                    });
                } catch (error) {
                    res.status(404).json({ status: "failed", data: null, error: error.message });
                }
            } else {
                res.status(401).json({
                    status: "failed",
                    data: null,
                    error: "Email y contraseña no coinciden",
                });
            }
        } else {
            res.status(401).json({
                status: "failed",
                data: null,
                error: "Email y contraseña no coinciden",
            });
        }
    } catch (error) {
        res.status(404).json({ status: "failed", data: null, error: error.message });
    }

}


const refreshToken = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Access denied" });
    }

    const user = { userId: req.user.id, email: req.user.email, password: req.user.password};
    const token = generateToken(user, false);
    const refreshToken = generateToken(user, true);

    res.status(200).json({
        status: "succeeded",
        data: {
            token,
            refreshToken,
        },
        error: null,
    });
}


module.exports = {
    signup,
    login,
    refreshToken,
}
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const userRouter = require('./routes/UsersRoute');
const loginRouter = require('./routes/LoginRoute');
const productsRouter = require('./routes/ProductsRoute');
const ordersRouter = require('./routes/OrdersRoute');
const emailPasswordResetRouter = require('./routes/EmailPasswordResetRoute')
const app = express();
const port = 9000;

app.use(express.json());
app.use(cors());

require("dotenv").config();
const url_mongo = process.env.DATABASE_URL_DEV;

mongoose.connect(url_mongo);

const db = mongoose.connection;

db.on("error", (error) => {
    console.log(`Error connecting with mongo: ${error}`);
});

db.on("connected", () => {
    console.log("Connected to mongo");
});

db.on("disconnected", () => {
    console.log("Mongo is disconnected");
});

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)
app.use('/password', emailPasswordResetRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
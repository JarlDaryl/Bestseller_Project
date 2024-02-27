const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const userRouter = require('./routes/UsersRoute');
const app = express();
const port = 9000;

app.use(express.json());
app.use(cors());

const url_mongo = "mongodb+srv://luisarquescalero:4sdnwSqKSqBRVtEn@Bestseller.imakdx0.mongodb.net/?retryWrites=true&w=majority" 

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
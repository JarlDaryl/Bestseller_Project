const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const PORT = 9000;
const userRouter = require('./routes/UsersRoute');
const app = express();

app.use(express.json());
app.use(cors());

const url_mongo = "mongodb+srv://luisarquescalero:4sdnwSqKSqBRVtEn@cluster0.imakdx0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" 

mongoose.connect(url_mongo);

const db = mongoose.connection;

db.on("error", console.log(`Error connecting with mongo: ${error}`));
db.on("connected", console.log("Connected to mongo"));
db.on("disconnected", console.log("Mongo is disconnected"));

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
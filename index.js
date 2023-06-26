// // const express = require("express");
// // const app = express();
// // const mongoose = require("mongoose");
// // const bodyParser = require("body-parser");
// // const compressRoutes = require("./routes/compress.js");
// // const cors = require("cors");

// app.use(cors());

// main()
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));

// async function main() {
//     await mongoose.connect("mongodb://localhost:27017/test");
// }

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//     res.send("hello world");
// });

// app.use("/api/compress", compressRoutes);



// app.listen(8080, () => {
//     console.log("listening on port 8080");
// });

import app from "./server.js"

import mongodb from "mongodb"

import compressDAO from "./dao/compressDAO.js"

import 'dotenv/config'

const MongoClient = mongodb.MongoClient
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.ru5mees.mongodb.net/?retryWrites=true&w=majority`

// const url = 'mongodb://127.0.0.1:27017'

const port = 8000

// const dbName = 'LZW'
// let db

MongoClient
    .connect(uri, {
        useNewUrlParser: true,
        maxPoolSize: 50,
        wtimeoutMS: 2500
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await compressDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    })

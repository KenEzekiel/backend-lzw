import app from "./server.js";

import mongodb from "mongodb";

import compressDAO from "./dao/compressDAO.js";

import "dotenv/config";

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.ru5mees.mongodb.net/?retryWrites=true&w=majority`;

// const url = 'mongodb://127.0.0.1:27017'

const port = process.env.PORT || 3000;

// const dbName = 'LZW'
// let db

MongoClient.connect(uri, {
  useNewUrlParser: true,
  maxPoolSize: 50,
  wtimeoutMS: 2500,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await compressDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// let dbName = 'express'
let dbUrl = `${process.env.DB_URL}/${process.env.DB_NAME}`;

module.exports = {dbUrl,mongodb,MongoClient}








// const MongoClient = require('mongodb').MongoClient

// MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
//   if (err) throw err

//   const db = client.db('express')

//   db.collection('food').find().toArray((err, result) => {
//     if (err) throw err

//     console.log(result)
//   })
// })
// Connection 
const { MongoClient } = require('mongodb')

const connection_URL =  process.env.MONGODB_URL || 'mongodb://localhost:27017'
const db_name = process.env.MONGODB_URL ? 'shortner_db' : 'shau_shortner' 
const collection_name = process.env.MONGODB_URL ? 'shorts' : 'mapped_urls'
const client = new MongoClient(connection_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

/*
  for warning removal 
  the options [servers] is not supported
  the options [caseTranslate] is not supported  
  Solution is : call client.connnect() only once

*/

const connectClient = (async function () {
  return await client.connect()
})()

const getCollection = () => {
  return connectClient
    .then(() => client.db(db_name))
    .then(db => db.collection(collection_name))
    .catch(err => console.log(err))
}

// validation required
const validation = require('./validation')

function validateAndReturn(pair) {
  // Is the Pair even Valid
  const valid = validation.isValid(pair)
  return new Promise((resolve, reject) => {
    getCollection()
      .then(table => {
        table.findOne({
            name: pair.name
          })
          .then(alreadyAvailable => {
            if (!valid) {
              reject('URL or short-name is Invalid!')
            }
            // alreadyAvailable === null  => not available in DB  
            if (alreadyAvailable === null) {
              resolve(table.insertOne(pair))
            } else {
              reject('Choose different short-name.')
            }
          })
      })
      .catch(err => {
        reject(err)
      })
  })
}

function findAndReturn(name) {
  return new Promise((resolve, reject) => {
    getCollection()
      .then(table => {
        validation.validateName(name) ?
          table.findOne({
            name
          })
          .then(available => {
            // available === null  => not available in DB  
            if (available === null) {
              reject('No mapping Found for Given Name')
            } else {
              resolve(available)
            }
          }) :
          reject('Invalid Name')
      })
  })
}

module.exports = {
  validateAndReturn,
  findAndReturn
}
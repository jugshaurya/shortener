// Connection 
const monk = require('monk')
const connection_URL  = process.env.MONGODB_URI || 'localhost/shau-shortner'; // (shau-shortner being the database)
const db = monk(connection_URL)

// table/collection  from db
const table = db.get('mapped_urls') 

// validation required
const validation = require('./validation')

function validateAndReturn (pair) { 
  // Is the Pair even Valid
  const valid = validation.isValid(pair)
  return new Promise ((resolve, reject) => {
    table.findOne({ name : pair.name })
    .then(alreadyAvailable => {
      if (!valid) {
        reject('URL or short-name is Invalid!')
      }
      // alreadyAvailable === null  => not available in DB  
      if (alreadyAvailable === null) {
        resolve(table.insert(pair))
      } else {
        reject('Choose different short-name.')
      }
    })
  })
}

function findAndReturn (name) { 
  return new Promise ((resolve, reject) => {
    validation.validateName(name) 
    ? 
      table.findOne({ name })
      .then(available => {
        // available === null  => not available in DB  
        if (available === null) {
          reject('No mapping Found for Given Name')
        } else {
          resolve(available)
        }
      })
    :
      reject('Invalid Name')
  })

}

module.exports = {
  validateAndReturn,
  findAndReturn
}




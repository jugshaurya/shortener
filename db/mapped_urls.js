// Connection 
const monk = require('monk')
const connection_URL  = process.env.MONGODB_URI || 'localhost/shau-shortner'; // (shau-shortner being db)
const db = monk(connection_URL)

// table/collection  from db
const collection = db.get('mapped_urls') 


// validation stuff

/**
 * 
 * @param pair {
 *    url: https://www.something.com,
 *    name : something-small
 * }  
 */


 // stackoverflow- snippet
function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

function validateName(value) {
  // console.log(value)
  // only alphanumbers with _ are allowed
  return /^[a-z A-Z0-9\\_\\"]+$/i.test(value);
}

function isValid(pair) {
  const name = pair.name
  const url = pair.url
  // console.log(validateUrl(url))
  // console.log(validateName(name))
  return (
    url && url.trim() !== '' &&
    validateUrl(url) && url.length >= 1 && url.length <= 100 &&
    
    name && name.trim() !== '' &&
    validateName(name) && name.length >= 1 && name.length <= 20 
  )
}

function alreadyExist(pair) {
  //check if pair.name already exist in db
  return false
}

function validateAndReturn (pair) { 
  const valid = isValid(pair)
  const exist = alreadyExist(pair)

  if (!valid) {
    return Promise.reject('Pair is Invalid !')
  }

  if (exist) {
    return Promise.reject('Choose other name , already exist in DB')
  }

  if (valid && !exist) {
    // insert into db and return the inserted - pair and returns a Promise
    // return collection.insert(pair)
    return Promise.resolve(pair)
  }

  return Promise.reject('Something is Wrong Shaurya is not able to find out!!')
}

module.exports = {
  validateAndReturn
}




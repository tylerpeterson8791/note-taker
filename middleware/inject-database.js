const fs = require('fs')

function injectData(req, res, next){
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    const db = JSON.parse(data)
    const database = { db }
    req.database = database 
    next()
  })
}

module.exports = injectData
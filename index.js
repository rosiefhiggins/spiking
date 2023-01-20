const fs = require('fs')

const databaseContents=fs.readFileSync("taxi.txt", "utf8")

exports.parsedContents=JSON.parse(databaseContents)


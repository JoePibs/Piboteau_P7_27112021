const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Liberte64$',
    database : "Groupomania"
  })
  
module.exports.getDB = function()
{
  return db;
}

module.exports.closeDB = function()
{  
  db.end();
}
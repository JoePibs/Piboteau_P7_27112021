const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Liberte64$',
    database : "groupomania2"
  })
  
module.exports.getDB = function()
{
  return db;
}

module.exports.closeDB = function()
{  
  db.end();
}
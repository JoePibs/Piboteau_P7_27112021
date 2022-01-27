const dbc = require('../utils/dbconnect')
const db = dbc.getDB();

exports.memberCount = (req, res, next) => {
    let sql = "SELECT COUNT(id) AS TOTAL FROM users u"
    let query =db.query(sql,function (err, result){
      if(err){
      throw err
      }
      res.status(200).json (result[0].TOTAL)
    })
};

exports.postCount = (req, res, next) => {
    let sql = "SELECT COUNT(id) AS TOTAL FROM post"
    let query =db.query(sql,function (err, result){
      if(err){
      throw err
      }
      res.status(200).json (result[0].TOTAL)
    })
};

exports.commentCount = (req, res, next) => {
    let sql = "SELECT COUNT(id) AS TOTAL FROM comment"
    let query =db.query(sql,function (err, result){
      if(err){
      throw err
      }
      res.status(200).json (result[0].TOTAL)
    })
};
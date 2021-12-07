const dbc = require('../utils/dbconnect')
const db = dbc.getDB();


// Afficher tous les posts si le post est actif
exports.getAllPost =(req,res, next) => {
  let sql = "SELECT * FROM post p WHERE p.isActive=1 ORDER BY date_creation DESC";
  let query = db.query (sql, (err,result)=>{
    if(err){
      throw err
    }
    res.status(200).json (result)
  })
};

exports.getOnePost =(req,res,next) => {
  let sql ="SELECT * FROM post p WHERE p.id = " + req.params.id;
  let query = db.query (sql, (err,result)=>{
    if(err){
      throw err
    }
    res.status(200).json (result)
  })
};

exports.getAllUserPost =(req,res,next) =>{
  var idUser = req.params.id ;
  let sql = "SELECT p.content,u.firstname, u.lastname FROM post p, users u WHERE p.user_id = u.id AND p.isActive=1  AND u.id = " + idUser;
  let query = db.query (sql, (err,result)=>{
    if(err){
      throw err
    }
    res.status(200).json (result)
  })
};

exports.createPost =(req,res,next) =>{
  let sql = "INSERT INTO post (user_id,content,isActive) VALUES (?, ?, ?)";
  console.log(req.body)
  let query = db.query(sql,[req.body.user_id, req.body.content, req.body.isActive],function (err, results,fields){
    if(err){
      throw err
    }
    res.status(200).json (results)
  })
};

/*exports.likePost =(req,res,next)
  var idUser = req.params.id ;
  var like = req.params.like; */

  
    


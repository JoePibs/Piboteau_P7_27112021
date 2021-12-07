const dbc = require('../utils/dbconnect')
const db = dbc.getDB();

//Créer un commentaire sous un post
exports.createComment =(req,res,next) =>{
    let sql = "INSERT INTO comment (user_id,post_id,content,isActive) VALUES (?, ?, ?, ?)";
    let query = db.query(sql,[req.body.user_id,req.body.post_id, req.body.content, req.body.isActive],function (err, results,fields){
      if(err){
        throw err
      }
      res.status(200).json (results)
    })
  };
// afficher tous les commentaires d'un post
exports.getAllComment =(req,res,next)=>{
    let postId = req.params.post_id;
    let sql = "SELECT * FROM comment c where c.isActive=1 AND c.post_id =? ORDER BY date_creation DESC"; 
    let query =db.query(sql,postId,function(err, result){
        if(err){
          throw err
        }
        res.status(200).json (result)
      })
};

// afficher les commentaires d'un utilisateur spécifique (l'utilisateur connecté)
exports.getAllUserComment =(req,res,next)=>{
    let userId = req.params.user_id;
    let sql = "SELECT c.content,u.firstname, u.lastname FROM comment c, users u WHERE c.user_id = u.id AND c.isActive=1  AND c.id = ? ORDER BY date_creation DESC";
    let query =db.query(sql, userId,function(err, result){
        if(err){
          throw err
        }
        res.status(200).json (result)
      })
};

// afficher un seul commentaire

exports.getOneComment =(req,res,next)=>{
    let commentId = req.params.id;
    let sql ="SELECT * FROM comment c WHERE c.isActive=1 AND c.id =?";
    let query =db.query(sql,commentId,function(err, result){
        if(err){
          throw err
        }
        res.status(200).json (result)
      })
};


//Modifier un commentaire 
exports.updateOneComment =(req,res,next)=>{
    let userId = req.params.id;
    let sql ="UDPATE * FROM comment c, users u WHERE c.isActive=1 AND c.user.id = u.id AND u.id =?";
    let query =db.query(sql,userId,function (err, result){
        if(err){
          throw err
        }
        res.status(200).json (result)
      })
};
//Rendre inactif un commentaire
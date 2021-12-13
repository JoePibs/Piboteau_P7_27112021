const dbc = require('../utils/dbconnect')
const db = dbc.getDB();
const check = require('../utils/helper')

//Créer un commentaire sous un post
exports.createComment =(req,res,next) =>{
    let img = localStorage.getItem("imageUrl");
    let sql = "INSERT INTO comment (user_id,post_id,content,img,isActive) VALUES (?, ?, ?, ?, ?)";
    let query = db.query(sql,[req.params.user_id,req.params.post_id, req.params.content,img, req.params.isActive],function (err, results,fields){
      if(err){
        throw err
      }
      res.status(200).json (results)
    })
  };
// afficher tous les commentaires d'un post
exports.getAllComment =(req,res,next)=>{
    let postId = req.params.post_id;
    let sql = "SELECT * FROM comment c where c.isActive=1 AND c.post_id =? ORDER BY c.last_update DESC"; 
    let query =db.query(sql,[postId],function(err, result){
        if(err){
          throw err
        }
        res.status(200).json (result)
      })
};

// afficher les commentaires d'un utilisateur spécifique (l'utilisateur connecté)
exports.getAllUserComment =(req,res,next)=>{
    let userId = req.params.user_id;
    let sql = "SELECT c.content,u.firstname, u.lastname FROM comment c, users u WHERE c.user_id = u.id AND c.isActive=1  AND c.id = ? ";
    let query =db.query(sql, [userId],function(err, result){
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
    let query =db.query(sql,[commentId],function(err, result){
        if(err){
          throw err
        }
        res.status(200).json (result)
      })
};
//Liker un commentaire
exports.likeComment =(req,res,next)=>{
  let userId = req.params.user_id;
  let type = "c";
  let idComment = req.params.comment_id;
  let sql = "INSERT INTO likes (user_id,type,comment_id) VALUES (?,?,?)";
  let query =db.query(sql,[userId, type, idComment],function (err, result){
    if(err){
    throw err
    }
    res.status(200).json ({message: "commentaire liké"})
  })
};

//disliker un commentaire
exports.dislikeComment =(req,res,next)=>{
  let userId = req.params.user_id;
  let type = "c";
  let id = req.params.id;
  let idComment = req.params.post_id;
  let sql = "SELECT * FROM likes l WHERE l.id = ? AND l.type = ? AND l.user_id = ? AND l.comment_id = ?";
  let query =db.query(sql,[id, type,userId, idComment],function (err, result){
    if(err){
      throw err
    }
    let sql2 ="DELETE FROM likes l WHERE l.id = ?";
    let query =db.query(sql2,[id],function (err, result){
      if(err){
        throw err
        }
        res.status(200).json ({message: "commentaire disliké"})
      })
    }
  )
}

//compter le nombre de like sur un post

exports.countLike =(req,res,next)=>{
  let commentId = req.params.comment_id;
  let type = "c"
  let sql = "SELECT COUNT(comment_id) AS TOTAL FROM likes l where l.comment_id = ? and l.type= ? "
  let query =db.query(sql,[commentId,type],function (err, result){
    if(err){
    throw err
    }
    res.status(200).json ({message :"Le nombre de like sur ce commentaire est : "+ result[0].TOTAL})
  })
};

// modifier ou desactiver un post si on est l'utilisateur ou l'admin
exports.deleteOneComment = (req,res,next) => {

  check.userAllowedToEditComment(req.userId, req.params.id)
      .then(function(isAllowed) {
          db.query('UPDATE comment c SET c.isActive=0 where c.id=?', [req.params.id], function(err, result) {
            console.log(req.userId)
              if (err) {
                  return res.status(500).json({error: err.message})
              }
              res.json({message: 'Commentaire désactivé.'});
          })
      })
      .catch(function(err) {
          res.status(500).json({message :"L'utilisateur n'est pas identifié comme propriétaire du comment , ni comme admin"})
      })
}

exports.updateOneComment = (req,res,next) => {
  check.userAllowedToEditComment(req.userId, req.params.id)
      .then(function(isAllowed) {
          let img = localStorage.getItem("imageUrl");
          db.query('UPDATE comment c SET c.content=? c.imageUrl = ? WHERE c.id=?', [req.body.content,img,req.params.id], function(err, result) {
              if (err) {
                  return res.status(500).json({error: err.message})
              }
              localStorage.removeItem("imageUrl");
              res.json({message: 'Commentaire modifié.'});
          })
      })
      .catch(function(err) {
        res.status(500).json({message :"L'utilisateur n'est pas identifié comme propriétaire du comment , ni comme admin"})
    })
}

  

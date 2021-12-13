const dbc = require('../utils/dbconnect')
const db = dbc.getDB();
const check = require('../utils/helper')

// Afficher tous les posts si le post est actif
exports.getAllPost =(req,res, next) => {
  let sql = "SELECT * FROM post p WHERE p.isActive=1 ORDER BY 'last_update' ASC";
  let query = db.query (sql, (err,result)=>{
    if(err){
      throw err
    }
    res.status(200).json (result)
  })
};
//Afficher un seul post
exports.getOnePost =(req,res,next) => {
  postId = req.params.id;
  let sql ="SELECT * FROM post p WHERE p.id = ? AND p.isActive=1";
  let query = db.query (sql,[postId], function (err, results,fields){
    if(err){
      throw err
    }
    res.status(200).json (results)
  })
};

//afficher tous les posts d'un seul utilisateur si le post est actif
exports.getAllUserPost =(req,res,next) =>{
  var idUser = req.params.id ;
  let sql = "SELECT p.content,u.firstname, u.lastname FROM post p, users u WHERE p.user_id = u.id AND p.isActive=1  AND u.id = ? ORDER BY 'last_update' ASC";
  let query = db.query (sql,[idUser], function (err, results,fields){
    if(err){
      throw err
    }
    res.status(200).json (results)
  })
};

//Créer un post
exports.createPost =(req,res,next) =>{
  let img = localStorage.getItem("imageUrl");
  let sql = "INSERT INTO post (user_id,content,imageUrl,isActive) VALUES (?, ?, ?, ?, ?)";
  let query = db.query(sql,[req.params.user_id, req.params.content,img,req.params.isActive],function (err, results,fields){
    if(err){
      throw err
    }
    localStorage.removeItem("imageUrl");
    res.status(200).json (results)
  })
};

// modifier un post si on est l'utilisateur ou l'admin
exports.deleteOnePost = (req,res,next) => {

  check.userAllowedToEditPost(req.userId, req.params.id)
      .then(function(isAllowed) {
          db.query('UPDATE post p SET p.isActive=0 where p.id=?', [req.params.id], function(err, result) {
            console.log(req.userId)
              if (err) {
                  return res.status(500).json({error: err.message})
              }
              res.json({message: 'Post désactivé.'});
          })
      })
      .catch(function(err) {
          res.status(500).json({message :"L'utilisateur n'est pas identifié comme propriétaire du post , ni comme admin"})
      })
}

exports.updateOnePost = (req,res,next) => {
  check.userAllowedToEditPost(req.userId, req.params.id)
      .then(function(isAllowed) {
          let img = localStorage.getItem("imageUrl");
          db.query('UPDATE post p SET p.content=? p.imageUrl = ? WHERE p.id=?', [req.body.content,img,req.params.id], function(err, result) {
              if (err) {
                  return res.status(500).json({error: err.message})
              }
              localStorage.removeItem("imageUrl");
              res.json({message: 'Post modifié.'});
          })
      })
      .catch(function(err) {
        res.status(500).json({message :"L'utilisateur n'est pas identifié comme propriétaire du post , ni comme admin"})
    })
}
  
  
//Liker un post
exports.likePost =(req,res,next)=>{
  let userId = req.params.user_id;
  let type = "p";
  let idPost = req.params.post_id;
  let sql = "INSERT INTO likes (user_id,type,post_id) VALUES (?,?,?)";
  let query =db.query(sql,[userId, type,idPost],function (err, result){
    if(err){
    throw err
    }
    res.status(200).json ({message: "post liké"})
  })
};

//disliker un post
exports.dislikePost =(req,res,next)=>{
  let userId = req.params.user_id;
  let type = "p";
  let id = req.params.id;
  let idPost = req.params.post_id;
  let sql = "SELECT * FROM likes l WHERE l.id = ? AND l.type = ? AND l.user_id = ? AND l.post_id = ?";
  let query =db.query(sql,[id, type,userId, idPost],function (err, result){
    if(err){
      throw err
    }
    let sql2 ="DELETE FROM likes l WHERE l.id = ?";
    let query =db.query(sql2,[id],function (err, result){
      if(err){
        throw err
        }
        res.status(200).json ({message: "post disliké"})
      })
    }
  )
}

//compter le nombre de like sur un post

exports.countLike =(req,res,next)=>{
  let postId = req.params.post_id;
  let type = "p"
  let sql = "SELECT COUNT(post_id) AS TOTAL FROM likes l where l.post_id = ? and l.type= ? "
  let query =db.query(sql,[postId,type],function (err, result){
  console.log(result)
    if(err){
    throw err
    }
    res.status(200).json ({message :"Le nombre de like sur ce post est : "+ result[0].TOTAL})
  })
};


//afficher les posts likés par un utilisateur

 
exports.allPostUserLike =(req,res,next)=>{
  let connectedUser = req.userId;
  console.log(connectedUser)
  let sql = 'SELECT u.firstname, u.lastname, p.content FROM user u, post p, like l WHERE u.id = p.id_user AND l.user_id = ? AND l.post_id = p.id';
  let query =db.query(sql,[connectedUser],function (err, result){
    if(err){
    throw err
    }
    res.status(200).json (result)
  })
};

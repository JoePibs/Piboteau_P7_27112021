const dbc = require('../utils/dbconnect')
const db = dbc.getDB();
const check = require('../utils/helper')

// Afficher tous les posts si le post est actif
exports.getAllPost =(req,res, next) => {
  let sql = "SELECT p.*,u.avatar,u.firstname,u.lastname,u.pseudo FROM post p,users u WHERE p.isActive=1 AND p.user_id = u.id AND u.isActive=1 ORDER BY p.last_update DESC";
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
  let sql ="SELECT p.*,u.avatar,u.firstname,u.lastname,u.pseudo FROM post p,users u WHERE p.id = ? AND p.user_id = u.id AND p.isActive=1";
  let query = db.query (sql,[postId], function (err, results,fields){
    if(err){
      throw err
    }
    res.status(200).json (results)
    console.log(results)
  })
};

//afficher tous les posts d'un seul utilisateur si le post est actif
exports.getAllUserPost =(req,res,next) =>{
  var idUser = req.userId;
  let sql = "SELECT p.content,p.user_id,p.id, p.date_creation,u.firstname, u.lastname,u.avatar,u.pseudo FROM post p, users u WHERE p.user_id = u.id AND p.isActive=1  AND u.id = ? AND u.isActive=1 ORDER BY p.date_creation DESC";
  let query = db.query (sql,[idUser], function (err, results,fields){
    if(err){
      throw err
    }
    res.status(200).json (results)
  })
};

//Créer un post
exports.createPost =(req,res,next) =>{
  let sql = "INSERT INTO post (user_id,content,imageUrl) VALUES (?, ?, ?)";
  let query = db.query(sql,[req.body.userId, req.body.content,req.body.imageUrl],function (err, results,fields){
    console.log(query)
    if(err){
      throw err
    }
    res.status(200).json (results)
  })
};

//Deleter un post si on est l'utilisateur ou l'admin
exports.deleteOnePost = (req,res,next) => {

  check.userAllowedToEditPost(req.userId, req.params.id)
      .then(function(isAllowed) {
          db.query('UPDATE post p SET p.isActive=0 where p.id=?', [req.params.id], function(err, result) {
            //db.query ('DELETE FROM post p where p.id =?)
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


  
  
//Liker un post
exports.likePost =(req,res,next)=>{
  let userId = req.userId;
  let type = "p";
  let idPost = req.params.post_id;
  // Chercher si le post a été liké
  let sql ="SELECT * FROM likes l WHERE l.user_id = ? AND l.post_id = ? AND l.type ='p' "
  let query =db.query(sql,[userId,idPost],function (err, result){
    if(err){
    throw err
    }
    if(result.length === 0){ //Si pas de like sur ce post par l'utilisateur , on insere un like
      let sql2 = "INSERT INTO likes (user_id,type,post_id,value) VALUES (?,?,?,1)";
      let query =db.query(sql2,[userId, type,idPost],function (err, result){
        if(err){
          throw err
        }
      res.status(200).json (result) 
    })

    }else{ //Si un like existe déja on udpdate en fonction de la valeur du like 1 = like 0 like a été disliké
      (result[0].value === 1) ? result[0].value = 0 : result[0].value = 1;
      let sql3 = "UPDATE likes l SET l.value = ? where l.user_id = ? AND l.post_id = ? AND l.type ='p'";
      let query =db.query(sql3,[result[0].value,userId,idPost,type],function (err, result){
        if(err){
          throw err
        }
      res.status(200).json (result)   
    })
    }
  })
};


//compter le nombre de like sur un post par un user
exports.likedby =(req,res,next) =>{
  let userId = req.userId;
  let idPost = req.params.post_id;
  let sql ="SELECT COUNT(id) AS TOTAL FROM likes l WHERE l.user_id = ? AND l.post_id = ? AND l.type ='p' AND l.value = '1' "
  let query =db.query(sql,[userId,idPost],function (err, result){
    if(err){
    throw err
    }
    res.status(200).json ({liked :result[0].TOTAL})
  })
};


//compter le nombre de like sur un post
exports.countLike =(req,res,next)=>{
  let postId = req.params.post_id;
  let type = "p"
  let sql = "SELECT COUNT(post_id) AS TOTAL FROM likes l where l.post_id = ? and l.type= ? and l.value ='1' "
  let query =db.query(sql,[postId,type],function (err, result){
  
    if(err){
    throw err
    }
    res.status(200).json ({likes :result[0].TOTAL})
  })
};


//Afficher les posts les plus commentés de moins d'un mois

exports.mostCommentPost =(req,res,next)=>{
 
  let sql = "SELECT p.id AS id ,p.user_id AS user_id,p.content AS content, p.date_creation As date_creation, u.firstname As firstname , u.lastname AS lastname , u.avatar AS avatar, u.pseudo AS pseudo, COUNT(c.id) AS total_comment FROM post p, comment c , users u WHERE c.post_id = p.id AND u.isActive=1 AND p.isActive=1 AND p.user_id = u.id AND p.date_creation > (NOW() - INTERVAL 3 MONTH) GROUP BY p.id ORDER BY 'total_comments' DESC"
  let query =db.query(sql,function (err, result){
    if(err){
    throw err
    }
    res.status(200).json (result)
  })
};




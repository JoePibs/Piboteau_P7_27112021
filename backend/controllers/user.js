const dbc = require('../utils/dbconnect');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken')
const db = dbc.getDB();
const check = require('../utils/helper')


exports.signup = async (req, res) => {
  try {
    const { password } = req.body; //je crée une variable password à partir de la clé password
    const salt = await bcrypt.genSalt(10); //je declare un salage
    const hashPassword = await bcrypt.hash(password, salt); //je génére le hash avec salage sur le passowrd

    const user = {
      ...req.body,
      password: hashPassword,
    }; 
    //Je crée un object user qui lit le body et remplace la valeur de ma clé password par la valeur hash
    
    const sql = "INSERT INTO users SET ?";  // Je lui demande de créer l'user à partir de valeur inconnues
  
    db.query(sql, [user], function(err, result,fields){ // je passe mon user en second argument pour que ma requete recoivent les bonnes valeurs
      if (!result) { //vu que la contraintre d'unicité de l'email ancrée dans ma table , il n'y aura un result que si l'email n'est pas déja dans la base /sinon l'utilisateur est considéré comme enregistrée
        res.status(200).json({ message: "Email déjà enregistré" });
      } else {
        res.status(201).json({ message: "Utilisateur crée !" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur d'enregistrement", err });
  }
};

//login
exports.login = (req, res,next) => {
  let email = req.body.email;
  const sql = "SELECT * FROM users u WHERE u.email = ?";
  db.query(sql, [email], (err, result) => { 
    // je passe mon email en second argument pour que ma requete recoivent les bonnes valeurs
    if (!result){
      return res.status(401).json({ error: 'Utilisateur non trouvé !' }); // if not existing user
    } 
    const user = result[0];
    bcrypt.compare(req.body.password,user.password)
      .then(valid => {
        if (!valid){
          return res.status(401).json ({message : 'mot de passe inconnu'})
        }
        res.status(200).json ({ //sinon j'envoie le token et l'utserid
          userId: user.id,
          token :jwt.sign(
            {userId: user.id},
            'RANDOM_TOKEN_SECRET',
            {expiresIn:'24h'})
          });
        })
      .catch(error => res.status(500).json({ error }));
    })
  } 


//descativer le compte 
exports.desactivateAccount = (req, res, next) => {
  const userId = req.params.id;
  const isAdmin = req.params.isAdmin;
  const sql = "UPDATE users u SET isActive=0 WHERE u.user_id = ? or u.isAdmin=1";
  db.query(sql, userId, (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }
    res.status(200).json({message :"compte desactivé"});
  });
};

//modifier le compte 
exports.updateAccount = (req, res, next) => {
  const lastname = req.body.lastname;
  const firstname = req.body.firstname;
  const email = req.body.email;
  const avatarImg = localStorage.getItem("avatar");
  const sql = "UPDATE users u SET u.firstname = ?, u.lastname = ?, u.email = ?, u.avatar = ? WHERE u.id = ?";
  db.query(sql, [firstname, lastname, email,avatarImg, req.userId], (err, results) => {
    if (err) {
      return res.status(500).json({ err });
    }
    localStorage.removeItem("avatar");
    res.status(200).json({message :"compte modifié"});
  });
};

exports.seeAprofil = (req, res, next) => {
    profilId = req.params.id;
    let sql ="SELECT u.firstname, u.lastname, u.email, u.bio, u.avatar FROM users u WHERE u.id = ? AND u.isActive=1";
    let query = db.query (sql,[profilId], function (err, results,fields){
      if(err){
        throw err
      }
      res.status(200).json (results)
    })
}

exports.controlPassword =  (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  const sql = "SELECT u.password FROM users u WHERE u.email = ?";
  db.query(sql, [email], (err, result) => { 
    // je passe mon email en second argument pour que ma requete recoivent les bonnes valeurs
    if (!result){
      return res.status(401).json({ error: 'Utilisateur non trouvé !' }); // if not existing user
    } 
    const user = result[0];
    bcrypt.compare(req.body.password,user.password)
      .then(valid => {
        if (!valid){
          return res.status(401).json ({message : 'mot de passe inconnu'})
        }
        res.status(200).json({message :"mot de passe vérifié"})
    })
  })
}

exports.updatePassword = (req, res, next) => {
  const saltRounds = 10;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);
  const sql = "UPDATE users u SET u.password = ? WHERE u.id = ?";
  db.query(sql, [hashPassword, req.userId], (err, results) => {
    if (err) {
      return res.status(500).json({ err });
    }
    res.status(200).json({message :"mot de passe vérifié"})
  })
}


//afficher les posts commentés par un utilisateur

exports.allPostUserHaveComment =(req,res,next)=>{
  let userId = req.params.id
  let sql = "SELECT p.content AS content, p.date_creation As date_creation, u.firstname As firstname , u.lastname AS lastname , u.avatar AS avatar FROM post p, comment c , users u WHERE c.user_id = ? AND p.id = c.post_id AND u.id = p.user_id AND c.date_creation > (NOW() - INTERVAL 1 MONTH) GROUP BY p.id ORDER BY 'c.date_creation' ASC "
  let query =db.query(sql,[userId],function (err, result){
    if(err){
    throw err
    }
    res.status(200).json (result)
  })
}
const dbc = require('../utils/dbconnect');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken')
const db = dbc.getDB();


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
  
    db.query(sql, user, (err, result) => { // je passe mon user en second argument pour que ma requete recoivent les bonnes valeurs
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


// je verifie que l'adresse email de l'utilisateur existe dans la base
  //1 j'identifie l'adresse email envoyé 
  //2 Je lance mar requete sql 
// Si elle existe, je lui demande de m'envoyer le body de l'utilisateur et je compare via bcryptcompare le password
//Si ok j'aministre un token 

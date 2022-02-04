const dbc = require('../utils/dbconnect')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = dbc.getDB()
const check = require('../utils/helper')
//const fs = require('fs'); //import Nodefs to manage file

exports.signup = async (req, res) => {
  const { password } = req.body 
  const salt = await bcrypt.genSalt(10) 
  const hashPassword = await bcrypt.hash(password, salt) 
  const user = { ...req.body, hashPassword }

  let sql = 'SELECT u.* FROM users u WHERE u.pseudo = ?'
  db.query(sql, [user.pseudo], function (err, result, fields) {
    if (result.length > 0) {
      res.status(401).json({ message: 'Pseudo déja utilisé' })
      return
    } else {
      sql =
        'INSERT INTO users (users.firstname, users.lastname, users.pseudo, users.email, users.password,users.avatar)  VALUES (?,?,?,?,?,?)'
      db.query(
        sql,
        [user.firstname, user.lastname, user.pseudo, user.email, user.hashPassword,user.avatar],
        function (err, result, fields) {
          if (!result) {
            res.status(400).json({ message: 'email déja utilisé' })
          } else {
            res.status(201).json({ message: 'licorne crée' })
          }
        }
      )
    }
  })
}

//login
exports.login = (req, res, next) => {
  let email = req.body.email
  const sql = 'SELECT * FROM users u WHERE u.email = ? AND u.isActive=1'
  db.query(sql, [email], (err, result) => {
    if (result.length === 0) {
      return res.status(403).json({ message: 'Utilisateur non trouvé ! Veuillez vérifier votre email ou contacter un administrateur' }) // if not existing user
    }
    const user = result[0]
    bcrypt
      .compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(403).json({ message: 'mot de passe inconnu' })
        }
        res.status(200).json({
          userId: user.id,
          isAdmin : user.isAdmin,
          firstname: user.firstname,
          lastname: user.lastname,
          pseudo: user.pseudo,
          avatar: user.avatar,
          email: user.email,
          bio: user.bio,
          token: jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h'
          })
        })
      })
      .catch(error => res.status(500).json({message : "Utilisateur inconnu" }))
  })
}

//Unactive account when you are THE user
exports.desactivateAccount = (req, res, next) => {
  const userId = req.userId
  const sql = 'UPDATE users u SET isActive=0 WHERE u.id = ?'
  /* db.query ('SELECT u.avatar FROM users u where u.id =?)
            if (err) {
                  return res.status(500).json({error: err.message})
              }
              res.json(result)
              const filename = result.split('/images/')[1]
              fs.unlink(`images/${filename}`, () => {
              db.query ('DELETE FROM users u where u.id =?) ...*/ //to delete definitly
  db.query(sql, userId, (err, results) => {
    if (err) {
      return res.status(404).json({ err })
    }
    res.status(200).json({ message: 'compte desactivé' })
  })
}

//Unactive account when you are THE admin
exports.desactivateByAdmin = (req, res, next) => {
  const userPost = req.params.id
  const userId = req.userId
  const sql = 'SELECT COUNT(id) AS TOTAL FROM users u WHERE u.id = ? and u.isAdmin=1'
  db.query(sql, userId, (err, results) => {
    if (err) {
      return res.status(404).json({ err })
    }
    const admin = results[0].TOTAL
    if(admin === 1){
      const sql2 = 'UPDATE users u SET isActive=0  WHERE u.id = ?'
  /* db.query ('SELECT u.avatar FROM users u where u.id =?)
            if (err) {
                  return res.status(500).json({error: err.message})
              }
              res.json(result)
              const filename = result.split('/images/')[1]
              fs.unlink(`images/${filename}`, () => {
              db.query ('DELETE FROM users u where u.id =?) ...*/ //to delete definitly
      db.query(sql2, userPost, (err, results) => {
        if (err) {
          return res.status(404).json({ err })
        }
        res.status(200).json({ message: 'compte desactivé par le modérateur' })
      })
    }
    else{
      res.status(401).json({ message: 'Interdit de supprimer , pas admin' }) 
    }
  })
}

//Update account
exports.updateAccount = (req, res, next) => {
  const id =req.userId
  const lastname = req.body.lastname
  const firstname = req.body.firstname
  const email = req.body.email
  const avatar = req.body.avatar
  const bio = req.body.bio
  const pseudo = req.body.pseudo
  const sql = 'UPDATE users u SET u.firstname = ?, u.lastname = ?, u.email = ?, u.avatar = ?, u.bio = ?, u.pseudo = ? WHERE u.id = ?'
  db.query(
    sql,
    [firstname, lastname, email, avatar,bio,pseudo, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ err })
      }
      res.status(200).json({ message: 'compte modifié' })
    }
  )
}

// See a profil 
exports.seeAprofil = (req, res, next) => {
  let profilId = req.params.id
  let sql =
    'SELECT u.id, u.firstname, u.lastname, u.email, u.bio, u.avatar, u.pseudo, u.date_creation, u.isAdmin FROM users u WHERE u.id = ? AND u.isActive=1'
  let query = db.query(sql, [profilId], function (err, results, fields) {
    if (err) {
      throw err
    }
    res.status(200).json(results)
  })
}

/*
exports.controlPassword = (req, res, next) => {
  let email = req.body.email
  let password = req.body.password
  const sql = 'SELECT u.password FROM users u WHERE u.email = ?'
  db.query(sql, [email], (err, result) => {
    // je passe mon email en second argument pour que ma requete recoivent les bonnes valeurs
    if (!result) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' }) // if not existing user
    }
    const user = result[0]
    bcrypt.compare(req.body.password, user.password).then(valid => {
      if (!valid) {
        return res.status(401).json({ message: 'mot de passe inconnu' })
      }
      res.status(200).json({ message: 'mot de passe vérifié' })
    })
  })
}

exports.updatePassword = (req, res, next) => {
  const saltRounds = 10
  const password = req.body.password
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashPassword = bcrypt.hashSync(password, salt)
  const sql = 'UPDATE users u SET u.password = ? WHERE u.id = ?'
  db.query(sql, [hashPassword, req.userId], (err, results) => {
    if (err) {
      return res.status(500).json({ err })
    }
    res.status(200).json({ message: 'mot de passe vérifié' })
  })
}
*/

//Display post commented by the user

exports.allPostUserHaveComment = (req, res, next) => {
  let userId = req.userId
  let sql =
    `SELECT count(c.id) AS TOTAL,p.content AS content, p.date_creation As date_creation,p.id AS id, p.user_id AS user_id, u.firstname As firstname , u.lastname AS lastname , u.avatar AS avatar, u.pseudo As pseudo 
    FROM post p, comment c , users u 
    WHERE c.user_id = ? 
    AND p.id = c.post_id 
    AND u.id = p.user_id 
    AND u.isActive=1 
    AND p.isActive =1
    AND c.date_creation > (NOW() - INTERVAL 3 MONTH) 
    GROUP BY c.user_id,c.post_id
    ORDER BY p.date_creation DESC`

  let query = db.query(sql, [userId], function (err, result) {
    if (err) {
      throw err
    }
    res.status(200).json(result)
  })
}


// control log to store step
exports.me = (req, res, next) => {
  const userId = req.userId
  if (!userId) {
    return res.status(403).json({ error: 'You must be logged in.' })
  }
  const sql = 'SELECT * FROM users u WHERE u.id = ?'
  db.query(sql, [userId], (err, result) => {
    if (!result) {
      return res.status(403).json({ error: 'Utilisateur non trouvé !' })
    }
    const user = result[0]
    return res.status(200).json({
      userId: user.id,
      isAdmin : user.isAdmin,
      firstname: user.firstname,
      lastname: user.lastname,
      pseudo: user.pseudo,
      avatar: user.avatar,
    })
  })
}

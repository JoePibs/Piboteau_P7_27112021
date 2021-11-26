const express = require('express');
const { Sequelize } = require('sequelize');



// Connect to mySql
var sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });
  
sequelize.authenticate()
.then(() => console.log('Connexion à mySQL est ok !'))
.catch(() => console.log('Connexion à mySQL échouée !'));
  


const app = express();


// Middleware Header to bypass errors by unblocking some CORS security systems, so that everyone can make requests from their browser
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');// indicate that resources can be shared from any origin
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //indicate the headers that will be used after the cross-origin pre-check to give authorization
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');  // indicate the authorised methods for HTTP requests
    res.setHeader('Content-Security-Policy', "default-src 'self'");// allow this server to provide scripts for the visited page
    next();
});


 
module.exports = app;
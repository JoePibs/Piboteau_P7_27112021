const express = require('express')
const mysql = require('mysql')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const path = require('path')
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comment')
const statsRoutes = require('./routes/stats')
const uploadRoutes = require('./routes/upload')

const app = express()
app.use(express.json())

//dev control in terminal
app.use(favicon(__dirname + '/favicon.ico')).use(morgan('dev'))
// Middleware Header to bypass errors by unblocking some CORS security systems, so that everyone can make requests from their browser
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // indicate that resources can be shared from any origin
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  ) //indicate the headers that will be used after the cross-origin pre-check to give authorization
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  ) // indicate the authorised methods for HTTP requests
  res.setHeader('Content-Security-Policy', "default-src 'self'") // allow this server to provide scripts for the visited page
  next()
})


// Static management of the image resource
// Midleware that allows to load files that are in the images directory
app.use('/images', express.static(path.join(__dirname, 'images')))
// Will serve the routes dedicated to the post
app.use('/api/post', postRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/upload',uploadRoutes)


module.exports = app


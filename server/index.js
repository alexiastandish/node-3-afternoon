// Require dependencies
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
require('dotenv').config()
const path = require('path')

// Middleware
const checkForSession = require('./middleware/checkForSession')

// Require files
const swag_controller = require('./controllers/swag_controller')
const auth_controller = require('./controllers/auth_controller')
const search_controller = require('./controllers/search_controller')
const cart_controller = require('./controllers/cart_controller')

const app = express()

// Bodyparser Middleware
app.use(bodyParser.json())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(checkForSession)
app.use(express.static(__dirname + '../build'))

// Endpoints - Swag
app.get('/api/swag', swag_controller.read)

// Endpoints - Auth
app.post('/api/register', auth_controller.register)
app.post('/api/login', auth_controller.login)
app.post('/api/signout', auth_controller.signout)
app.get('/api/user', auth_controller.login)

// Endpoints - Search
app.get('/api/search', search_controller.search)

// Endpoints - Cart
app.post('/api/cart', cart_controller.add)
app.post('/api/checkout', cart_controller.checkout)
app.delete('/api/cart', cart_controller.remove)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

const port = process.env.SERVER_PORT || 3000

// Testing connection
app.listen(port, () => {
  console.log(`marco... polooooo ${port}`)
})

// Modules and Globals
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
// const defineCurrentUser = require('./middleware/defineCurrentUser')

// Express Settings
app.use(cors({
    origin: 'http://localhost:3000', // Specify the allowed origin here
    credentials: true, // Enable credentials
  }))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(defineCurrentUser)

// Controllers & Routes

app.use(express.urlencoded({ extended: true }))

// app.use('/places', require('./controllers/places'))
app.use('/reviews', require("./controllers/reviews"))
app.use('/users', require('./controllers/users'))
app.use('/api', require('./controllers/authentication'))



// Listen for Connections
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})
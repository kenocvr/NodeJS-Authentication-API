const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);
// On Connection
mongoose.connection.on('error', ()=>{
  console.log('Database Error at '+config.database + " " +err);
});
// On Error Connection
mongoose.connection.on('connected', (err)=>{
  console.log('Connected to database '+config.database);
});

const app = express();

// User Routes
const users = require('./routes/users');

const port = 3000;


// CORS Middleware
app.use(cors());

// Set Static Folder for Public/Client
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyparser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port,() => {
  console.log('server started on port ' +port);
});















//For whitespace

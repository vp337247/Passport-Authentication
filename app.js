const express = require('express')

const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')

const app = express();

//DB config
const db = require('./config/keys').MongoURI;
//mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
//Connect to Mongo
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true })
 .then(()=>console.log('MongoDB Connected...'))
 .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


//Bodyparser
app.use(express.urlencoded({extended: false}))
//Express session 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))
//Connect flash
app.use(flash());
//GLobal vars
app.use((req,res,next) => {
    
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg')
    next();
})  
//Routes
app.use('/', require('./routes/index'))

app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server Started on Port 5000'));                                  
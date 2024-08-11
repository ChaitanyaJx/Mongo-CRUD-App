const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./password-config');
initializePassport(
  passport, 
  email => {
  return users.find(user => user.email === email)
});

const productRoute = require('./routes/product.route');

const app = express();

const users = []

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//Routes
app.use('/product', productRoute);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', (req, res) => {
  res.render('index', {
    title: 'MongoDB CRUD App',
  })
})

app.get('/login', (req, res) => {
  res.render('login.ejs')
})

app.get('/register', (req, res) => {
  res.render('register.ejs')
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/product',
  failureRedirect: '/login',
  failureFlash: true
}))

app.post('/register', async (req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  }catch(error){
    res.redirect('/register')
  }
})
const MongoDBURL = process.env.MONGODB_URI;

mongoose
  .connect(MongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => {
      console.log('Example app listening on port http://localhost:3000');
    });
  })
  .catch((error) => {
    console.log('MongoDB not connected:', error.message);
  });

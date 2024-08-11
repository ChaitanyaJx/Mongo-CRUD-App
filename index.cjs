const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const productRoute = require('./routes/product.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//Routes
app.use('/product', productRoute);


app.get('/', (req, res) => {
  res.render('index', {
    title: 'MongoDB CRUD App',
  })
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

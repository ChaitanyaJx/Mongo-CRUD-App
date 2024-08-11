const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/product', productRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose
  .connect('mongodb+srv://chaitanyajambhulkar768:yUvxl8sRfB3cSnc3@nodeapi.2kvd4.mongodb.net/?retryWrites=true&w=majority&appName=NodeAPI', {
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

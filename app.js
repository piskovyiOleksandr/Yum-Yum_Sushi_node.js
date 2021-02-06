const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const staticAsset = require('static-asset');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

// sets and uses
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/javascripts',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);

// routers
app.get('/', (req, res) => {
  res.render('index');
});
app.use('/goods', routes.goods);
app.use('/cart', routes.cart);



// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', {
    message: error.message
  });
});



async function start() {
  try {
    await mongoose.connect('mongodb+srv://oleksandr:oleksandr@cluster0.q6pf0.mongodb.net/yum-yum?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(4000, () => console.log('Server work!'))
  } catch (e) {
    console.log('Server Error', e.message)
  }
}

start()

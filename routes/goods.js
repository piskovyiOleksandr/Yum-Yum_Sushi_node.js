const express = require('express');
const router = express.Router();

const models = require('../models');


function goods(req, res, category) {

    models.Goods.find({
        category: category
    })
    .then(g => {
      var goods = g;
      console.log(goods);
          res.render('goods', {
            goods,
            category
        })
    })
    .catch(console.log);
  }
  
  // routers
  router.get('/roles', (req, res) => goods(req, res, 'roles'));
  router.get('/sushi', (req, res) => goods(req, res, 'sushi'));
  router.get('/seasonal-menu', (req, res) => goods(req, res, 'seasonal-menu'));
  router.get('/sushi-sets', (req, res) => goods(req, res, 'sushi-sets'));
  router.get('/sashimi', (req, res) => goods(req, res, 'sashimi'));
  router.get('/hot-meals', (req, res) => goods(req, res, 'hot-meals'));
  router.get('/drinks', (req, res) => goods(req, res, 'drinks'));
  router.get('/desserts', (req, res) => goods(req, res, 'desserts'));


module.exports = router;
const express = require('express');
const router = express.Router();

const models = require('../models');


router.get('/order', (req, res) => {

    res.render('order');

});

router.post('/order', (req, res) => {

    console.log(req.body);

    const surname = req.body.surname;
    const name = req.body.name;
    const street = req.body.street;
    const numb = req.body.numb;
    const apartment = req.body.apartment;
    const nameOrder = req.body.nameOrder;
    const sumOrder = req.body.sumOrder;

            models.Order.create({
             surname,
             name,
             street,
             numb,
             apartment,
             nameOrder,
             sumOrder
            })
              .then(order => {
                console.log(order);
                res.json({
                  ok: true
                });
              })
              .catch(err => {
                console.log(err);
                res.json({
                  ok: false
                });
              });
          });

module.exports = router;
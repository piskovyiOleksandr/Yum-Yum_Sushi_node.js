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
  const phone = req.body.phone;
  const street = req.body.street;
  const numb = req.body.numb;
  const apartment = req.body.apartment;
  const nameOrder = req.body.nameOrder;
  const sumOrder = req.body.sumOrder;

  if (!surname || !name || !phone || !street || !numb || !apartment) {
    const fields = [];
    if (!surname) fields.push('surname');
    if (!name) fields.push('name');
    if (!phone) fields.push('phone');
    if (!street) fields.push('street');
    if (!numb) fields.push('numb');
    if (!apartment) fields.push('apartment');

    res.json({
      ok: false,
      error: 'Всі поля повинні бути заповнені!',
      fields
    });
  } else {
    models.Order.create({
      surname,
      name,
      phone,
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
  }
});
            

module.exports = router;
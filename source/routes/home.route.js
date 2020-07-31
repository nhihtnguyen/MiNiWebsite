const express = require('express');
const homeModel = require('../models/home.model');

const router = express.Router();

router.get('/', async (req, res) => {

  const rows = await homeModel.top();
/*   const rows2 =await homeModel.topprice();
  const rows3 =await homeModel.topend(); */
  res.render('home', {
    products: rows,
    /* products2: rows2,
    products3: rows3, */
  });
})


module.exports = router;
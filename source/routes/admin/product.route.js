const express = require('express');
const productModel = require('../../models/product.model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
   const rows = await productModel.all();
    res.render('vwManageProduct/index', {
      products: rows,
      empty: rows.length === 0
    });
  } catch (err) {
    console.log(err);
    res.end('View error log in console.');
  }

})

module.exports = router;
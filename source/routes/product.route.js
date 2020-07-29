const express = require('express');
const productModel = require('../models/product.model');
const config = require('../config/default.json');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const proId = req.params.id;
        const rows = await productModel.single(proId);
        res.render('vwProducts/detail', {
            product: rows[0]
        });
      } catch (err) {
        console.log(err);
        res.end('View error log in console.');
      }
})


module.exports = router;
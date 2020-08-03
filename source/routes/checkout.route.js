const express = require('express');
const cartModel = require('../models/cart.model');

const router = express.Router();

router.get('/cart', async(req, res) => {
    const rows = await cartModel.listProductByUserID(1);
    res.render('vwCheckout/cart', {
        products: rows,
        empty: rows.length === 0,
    });
})
module.exports = router;

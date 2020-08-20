const express = require('express');
const orderModel = require('../../models/order.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const rows = await orderModel.all();
  res.render('vwAdmin/vwOrder/index', {
    categories: rows,
    empty: rows.length === 0
  });
})

module.exports = router;

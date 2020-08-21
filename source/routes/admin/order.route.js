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

router.get('/:orderId/processing', async(req, res) => {
  const result = await orderModel.processing(req.params.orderId);
  res.redirect('/admin/orders');

})

router.get('/:orderId/delivering', async(req, res) => {
  const result = await orderModel.delivering(req.params.orderId);
  res.redirect('/admin/orders');

})

router.get('/:orderId/success', async(req, res) => {
  const result = await orderModel.success(req.params.orderId);
  res.redirect('/admin/orders');

})

router.get('/:orderId/cancel', async(req, res) => {
  const result = await orderModel.cancel(req.params.orderId);
  res.redirect('/admin/orders');

})

module.exports = router;

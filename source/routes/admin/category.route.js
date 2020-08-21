const express = require('express');
const productModel = require('../../models/product.model');
const categoryModel=require('../../models/category.model');

const router = express.Router();

router.get('/', async(req, res) => {
  const rows = await categoryModel.all();
  res.render('vwAdmin/vwCategories/index', {
      categories: rows,
      empty: rows.length === 0
  });
})

router.get('/:id/detail', async(req, res) => {
  try {
      const rows = await productModel.allByCat(+req.params.id);
      res.render('vwAdmin/vwCategories/detail', {
          categories: rows,
          empty: rows.length === 0
      });
  } catch (err) {
      console.log(err);
      //res.end('View error log in console.');
      res.render('error', { layout: false });
  }
})

router.get('/detail/:productId/edit', async (req, res) => {
  try {
    const row = await productModel.single(req.params.productId);
    /* console.log(row[0]); */
    res.render('vwAdmin/vwCategories/edit', {
      product: row[0],
      empty: row[0].length === 0
    });
  } catch (err) {
    console.log(err);
    res.render('error', { layout: false });
  }
})

router.post('/detail/:productId/edit', async(req, res) => {
  const proId=req.params.productId;
  const result = await productModel.patch(req.body,proId);
  res.redirect('/admin/categories');
})

module.exports = router;

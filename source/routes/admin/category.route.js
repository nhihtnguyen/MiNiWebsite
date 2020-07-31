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

/* router.get('/add', (req, res) => {
  res.render('vwAdmin/vwCategories/add');
})

router.post('/add', async(req, res) => {
  const result = await categoryModel.add(req.body);
  res.render('vwAdmin/vwCategories/add');
}) */

router.get('/:id/detail', async(req, res) => {
  try {
      // const rows = await db.load('select * from categories');
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

module.exports = router;



/* router.get('/', async (req, res) => {
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

}) */
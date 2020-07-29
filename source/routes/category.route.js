const express = require('express');
const productModel = require('../models/product.model');
const config = require('../config/default.json')

const router = express.Router();

router.get('/:id/products', async (req, res) => {
  try {

    const catId = req.params.id;
    const limit = config.paginate.limit;

    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;

    const [total, rows] = await Promise.all([
      productModel.countByCat(catId),
      productModel.pageByCat(catId, offset)
    ]);

    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;
    const page_numbers = [];
    for (i = 1; i <= nPages; i++) {
      page_numbers.push({
        value: i,
        isCurrentPage: i === +page
      })
    }

    console.log(rows);

    rows.forEach(async element => {
      element.check = (await productModel.check({
        UserID: res.locals.authUser.UserID,
        ProductID: +element.ProductID
      }) == false)
    });

    //  const rows = await productModel.allByCat(req.params.id);
    res.render('vwManageProduct/allByCat', {
      products: rows,
      product: rows[0],
      empty: rows.length === 0,
      page_numbers,
      prev_value: +page - 1,
      next_value: +page + 1,
    });
  } catch (err) {
    console.log(err);
    res.end('View error log in console.');
  }
})

// vw product detail
router.get('/products/:id', async (req, res) => {

  const catId = req.params.id;

  const rows = await productModel.single(catId);
  res.render('vwProducts/detail', {
    products: rows[0],
    empty: rows.length === 0,
  });


})

module.exports = router;
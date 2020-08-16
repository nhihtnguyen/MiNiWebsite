const express = require('express');
const cartModel = require('../models/cart.model');

const router = express.Router();

router.get('/cart', async(req, res) => {
    const user = req.session.authUser;
   
    if(user)
    {
       var cart =  req.session.cart;
        if(!cart)
        {
    const rows = await cartModel.listProductByUser(user.user_id);
    req.session.cart = rows;
    cart =  req.session.cart;
    
        }
    
    var temptotal =0;
    var promo =0;
    for (var i =0;i<cart.length;i++)
    {
    cart[i].sub = cart[i].amount*cart[i].price;
    temptotal+=cart[i].sub;
    }
    var total = temptotal-promo;

    res.render('vwCheckout/cart', {
        products: cart,
        empty: cart.length === 0,
        total: total,
        nopromo: promo.length ===0,
        promo: promo,
        temptotal: temptotal,
    });
}
else
{
res.render('vwCheckout/cart', {
    empty: true,
});
}
})

router.get('/update/:product', function(req,res)
{
var product_id = req.params.product;
var action = req.query.action;
var cart = req.session.cart;
for (var i=0;i<cart.length;i++)
{
    if(cart[i].product_id==product_id)
    {
        switch (action)
        {
            case "plus": cart[i].amount++;
            break;
            case "minus": cart[i].amount--;
            break;
            default:
                console.log('update problem');
                break;
        }
        break;
    }
}
res.redirect('/checkout/cart');
})
module.exports = router;

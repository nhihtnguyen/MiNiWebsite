const express = require('express');
const cartModel = require('../models/cart.model');
const orderModel = require('../models/order.model');
const moment = require('moment');
const router = express.Router();

router.get('/cart', async (req, res) => {
    const user = req.session.authUser;

    if (user) {
        var cart = req.session.cart;
        if (!cart) {
            const rows = await cartModel.listProductByUser(user.user_id);
            req.session.cart = rows;
            cart = req.session.cart;

        }

        var temptotal = 0;
        var promo = 0;
        for (var i = 0; i < cart.length; i++) {
            cart[i].sub = cart[i].amount * cart[i].price;
            temptotal += cart[i].sub;
        }
        var total = temptotal - promo;
        req.session.total = total;

        res.render('vwCheckout/cart', {
            products: cart,
            empty: cart.length === 0,
            total: total,
            nopromo: promo.length === 0,
            promo: promo,
            temptotal: temptotal,
            order: cart[0].cart_id,
        });
    }
    else {
        res.render('vwCheckout/cart', {
            empty: true,
        });
    }
})

router.get('/confirm/:order', async (req, res) => {
    var order_id = req.params.order;
    var link = '/checkout/order/' + order_id;
    var cart = req.session.cart;
    console.log(cart);
    for (var i = 0; i < cart.length; i++) {
        var result = await cartModel.updateSingleItem(cart[i]);
    }
    res.redirect(link);
})

router.get('/order/:order', (req, res) => {
    const order = req.params.order;
    const user = req.session.authUser;

    res.render('vwCheckout/orderInformation', {
        user: user,
        order_id: order,
    });

})

router.get('/currentuser', (req, res) => {
    const user = req.session.authUser;
    const cart = req.session.cart;

    var order_date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    console.log(user);
    const order = { 'recipient_name': user.full_name, 'recipient_phone': user.phone_number, 'shipping_address': user.address, 'customer_id': user.user_id, 'cart_id': cart[0].cart_id, 'order_date': order_date, 'total': req.session.total, 'status': 'đang xử lý' }
    req.session.order = order;

    console.log(req.session.order);


    res.redirect('/checkout/payment');

})


router.post('/order/:order', (req, res) => {
    const user = req.session.authUser;
    const cart = req.session.cart;
    var order_id = req.params.order;
    console.log(req.body);
    req.body.shipping_address = req.body.address + ' ' + req.body.ward + ' ' + req.body.district + ' ' + req.body.province;
    delete req.body.address;
    delete req.body.ward;
    delete req.body.district;
    delete req.body.province;
    req.body.customer_id = user.user_id;
    req.body.cart_id = cart[0].cart_id;
    req.body.order_date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    req.body.total = req.session.total;
    req.body.status = 'đang xử lý';

    req.session.order = req.body;

    console.log(req.body);

    res.redirect('/checkout/payment');
})



router.get('/update/:product', function (req, res) {
    var product_id = req.params.product;
    var action = req.query.action;
    var cart = req.session.cart;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product_id == product_id) {
            switch (action) {
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



router.get('/payment', async (req, res) => {
    const user = req.session.authUser;
    var cart = req.session.cart;
    var temptotal = req.session.total;
    var shipping_fee = 30;
    var total = temptotal + shipping_fee;
    req.session.order.total = total;

    res.render('vwCheckout/payment', {
        products: cart,
        empty: cart.length === 0,
        temptotal: temptotal,
        total: total,
        order: cart[0].cart_id,
        fee: shipping_fee,
    });
}
)
router.get('/payment/confirm', async (req, res) => {
    const order = req.session.order;
    console.log(order);
    const result = await orderModel.add(order);

    res.redirect('/checkout/list');
}
)

router.get('/list', async (req, res) => {
    const user_id = req.session.authUser.user_id;
    const rows = await orderModel.orderByUser(user_id);
    rows.forEach(e => {
        moment(e.order_date).format("DD-MM-YYYY");
    });
    res.render('vwCheckout/listOrder',
        {
            orders: rows,

        });
})
module.exports = router;

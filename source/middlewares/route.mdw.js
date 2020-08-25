module.exports = function(app) {
    app.use('/', require('../routes/home.route'));
    app.use('/admin/categories', require('../routes/admin/category.route'));
    app.use('/admin/orders', require('../routes/admin/order.route'));
    app.use('/categories', require('../routes/category.route'));
    app.use('/products', require('../routes/product.route'));
    app.use('/account',require('../routes/account.route'));
    app.use('/checkout',require('../routes/checkout.route'));
    app.use('/search', require('../routes/main.route'));
};
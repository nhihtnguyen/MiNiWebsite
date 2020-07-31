module.exports = function(app) {
    app.use('/', require('../routes/home.route'));
    app.use('/admin/categories', require('../routes/admin/category.route'));
    app.use('/categories', require('../routes/category.route'));
    app.use('/products', require('../routes/product.route'));
    app.use('/account',require('../routes/account.route'));
};
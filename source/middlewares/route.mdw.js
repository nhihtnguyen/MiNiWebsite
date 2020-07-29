module.exports = function(app) {
    app.use('/admin/products', require('../routes/admin/product.route'));
    app.use('/categories', require('../routes/category.route'));
    app.use('/products', require('../routes/product.route'));

};
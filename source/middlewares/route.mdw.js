module.exports = function(app) {
    app.use('/admin/products', require('../routes/admin/product.route'));
   

};
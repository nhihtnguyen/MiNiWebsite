const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from cart'),
    cartByUserId : user_id => db.load(`select cart_id from cart where customer_id= ${user_id}`),
    listProductByCart: cart_id => db.load(`select* from cart_detail as c left join product as p on c.product_id=p.product_id where c.cart_id =${cart_id}`),
    listProductByUser: user_id => db.load(`select d.*,p.* from cart as c left join cart_detail as d on c.cart_id=d.cart_id left join product as p on d.product_id=p.product_id where c.customer_id = ${user_id}`)
 
};

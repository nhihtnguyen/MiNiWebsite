const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from cart'),

    singleByUserID: user_id => db.load(`select * from cart where  user_id = ${user_id}`),
    listProductByCart: cart_id => db.load(`select * from cart_detail where  cart_id = ${cart_id}`),
    listProductByUserID: user_id => db.load(`select* from cart as c left join cart_detail as d on c.cart_id=d.cart_id where c.customer_id =${user_id} `),
 
};

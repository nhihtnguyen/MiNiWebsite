const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from cart'),
    cartByUserId: user_id => db.load(`select cart_id from cart where customer_id= ${user_id}`),
    listProductByCart: cart_id => db.load(`select* from cart_detail as c left join product as p on c.product_id=p.product_id where c.cart_id =${cart_id}`),
    listProductByUser: user_id => db.load(`select d.*,p.* from cart as c left join cart_detail as d on c.cart_id=d.cart_id left join product as p on d.product_id=p.product_id where c.customer_id = ${user_id}`),
    /* add: (tableName, cart_id, product_id, subtotal) => db.load(`insert into ${tableName} values ('${cart_id}','${product_id}','1','${subtotal}') where cart_id = ${cart_id}`), */
    updateSingleItem: entity => {
        const condition1 = { cart_id: entity.cart_id };
        const condition2 = { product_id: entity.product_id };
        const amount = { amount: entity.amount };
        return db.update('cart_detail', amount, condition1, condition2);
    },
    add: (cart_id, product_id, subtotal) => db.load(`insert into cart_detail values ('${cart_id}','${product_id}','1','${subtotal}')`),
    init: (customer_id) => db.load(`insert into cart set total_price = '0', customer_id =${customer_id}`)

};

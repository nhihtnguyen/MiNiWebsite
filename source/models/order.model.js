const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from order'),
    add: (entity) => db.add('sale_order',entity),
    orderByUser: (customer_id) => db.load(`select * from sale_order where customer_id = ${customer_id}`),

    processing: orderId => db.load(`update sale_order set status = 'Đang xử lý' where order_id = ${orderId}`),
  
    delivering : orderId => db.load(`update sale_order set status = 'Đang giao hàng' where order_id = ${orderId}`),
  
    success : orderId => db.load(`update sale_order set status = 'Giao thành công' where order_id = ${orderId}`),
  
    cancel : orderId => db.load(`update sale_order set status = 'Hủy đơn hàng' where order_id = ${orderId}`),


};

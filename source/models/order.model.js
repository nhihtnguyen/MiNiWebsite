const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from order'),
    add: (entity) => db.add('sale_order',entity),
    orderByUser: (customer_id) => db.load(`select * from sale_order where customer_id = ${customer_id}`)
   
};

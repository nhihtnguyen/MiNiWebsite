const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from order'),
    add: (entity) => db.add('sale_order',entity),
   
};

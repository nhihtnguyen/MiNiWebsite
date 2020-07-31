const db = require('../utils/db');
const config = require('../config/default.json');

module.exports={
    top: () => db.load(`select * from product  left join category 
      on product.category_id = category.category_id
      where product.category_id = 1 limit 4`)
};

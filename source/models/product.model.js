const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
  all() { return db.load('select*from product') },

  allByCat: catId => db.load(`select * from product where category_id=${catId}`),

  countByCat: async catId => {
    const rows = await db.load(`select count(*) as total from product where category_id = ${catId}`)
    return rows[0].total;
  },
  
  pageByCat: (catId, offset) => db.load(`select * from product  left join category 
  on product.category_id = category.category_id
  where product.category_id = ${catId} limit ${config.paginate.limit} offset ${offset}`),

  single: id => db.load(`select * from product where product_id = ${id}`),

};

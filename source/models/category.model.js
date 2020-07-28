const db = require('../utils/db');

module.exports = {
  all() { return db.load('select*from category') },

  allWithDetails: _=>{
      const sql =`select c.category_id, c.name, count(p.product_id) as num_of_product 
                from category c left join product p 
                on c.category_id =p.category_id group by c.category_id, c.name;`
       return db.load(sql);
  }
};
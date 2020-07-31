const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
 connectionLimit: 50,
  host:'localhost',
  port:3306,
  user:'root',
  password:'1234',
  database:'cosmetic_website'
});

const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
  load: sql => mysql_query(sql),

};

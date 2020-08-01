const express = require('express');
const exphbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const morgan = require('morgan');
const session = require('express-session');
const app = express();


app.engine('hbs', exphbs({
  defaultLayout: 'main.hbs',
  layoutsDir: 'views/_layouts',
  helpers: {
      section: hbs_sections(),
  }

}));

// middleware hỗ trợ nhận req.body gửi tới dưới dạng String hoặc Array
// urlencoded sẽ parses x-ww-form-urlencoded request bodies
app.use(express.urlencoded({
    extended: true
}));
//// middleware hỗ trợ nhận req.body gửi tới dưới dạng json
app.use(express.json());



app.use(express.static('public'));
app.use(morgan('dev'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,

}))
app.set('view engine', 'hbs'); 

require('./middlewares/locals.mdw')(app);
require('./middlewares/route.mdw')(app);

app.get('/', (req, res) => {
  res.render('home');
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})
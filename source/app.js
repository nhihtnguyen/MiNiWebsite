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


app.use(express.urlencoded({
    extended: true
}));


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
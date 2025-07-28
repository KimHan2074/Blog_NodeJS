const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
// Statis file
app.use(express.static(path.join(__dirname, 'public'))); /*localhost:3000/img/hbs.jpg (sẽ hiển thị ảnh trên trình duyệt*/
// HTTP logger
app.use(morgan('combined'));
// Template Engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));
console.log('path', path.join(__dirname, 'resource/views'));
// route
app.get('/', (req, res) => {
  res.render('home');
}) 

app.get('/news', (req, res) => {
  res.render('news');
})/*arrow function*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

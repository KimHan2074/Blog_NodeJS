const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const route = require('./routes');
// Statis file
app.use(express.static(path.join(__dirname, 'public'))); /*localhost:3000/img/hbs.jpg (sẽ hiển thị ảnh trên trình duyệt*/

// Middleware để xử lý dữ liệu gửi lên server (req.body có dữ liệu)
app.use(express.urlencoded()); /*gửi dữ liệu từ form  HTML */
app.use(express.json()); /* gửi dữ liệu từ XMLHttpRequest, fetch API, axios */

// HTTP logger
// app.use(morgan('combined'));

// Template Engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));
console.log('path', path.join(__dirname, 'resource/views'));
// routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}) /*Start một cái web server*/

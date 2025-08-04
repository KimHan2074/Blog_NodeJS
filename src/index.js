const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
// Connect to DB
db.connect();
// Statis file
app.use(
    express.static(path.join(__dirname, 'public')),
); /*localhost:3000/img/hbs.jpg (sẽ hiển thị ảnh trên trình duyệt*/

// Middleware để xử lý dữ liệu gửi lên server (req.body có dữ liệu)
app.use(express.urlencoded()); /*gửi dữ liệu từ form  HTML */
app.use(express.json()); /* gửi dữ liệu từ XMLHttpRequest, fetch API, axios */
app.use(methodOverride('_method'));
// HTTP logger
// app.use(morgan('combined'));

// Template Engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));
// console.log('path', path.join(__dirname, 'resource/views'));
// routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
}); /*Start một cái web server*/

// Không chạy husky được nên mỗi lần git add -> npm run beautiful -> git commit ...

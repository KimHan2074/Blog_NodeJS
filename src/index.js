const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const SortMiddleware = require('./app/middleware/SortMiddleware');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const minimatch = require('minimatch');
// Connect to DB
db.connect();
// Statis file
app.use(
    express.static(path.join(__dirname, 'public')),
); /*localhost:3000/img/hbs.jpg (sẽ hiển thị ảnh trên trình duyệt*/

// Middleware để xử lý dữ liệu gửi lên server (req.body có dữ liệu)
app.use(express.urlencoded({ extended: true })); /*gửi dữ liệu từ form  HTML */
app.use(express.json()); /* gửi dữ liệu từ XMLHttpRequest, fetch API, axios */
app.use(methodOverride('_method'));
// Custom Middleware
app.use(SortMiddleware);
// HTTP logger
// app.use(morgan('combined'));

app.get(
    '/middleware',
    function (req, res, next) {
        if (['vethuong', 'vevip'].includes(req.query.ve)) {
            req.face = 'drawwwwwww on the face!';
            return next(); /*phải có next() để sang middleware thứ 2 hoặc xuống function handler*/
        }

        res.status(403).json({
            message: 'Access denied',
        });
        /*nếu không có next() hoặc res. send... thì ứng dụng sẽ bị treo*/
    } /*middleware*/,
    // Muốn middleware nào chạy trước thì sắp xếp nó trước
    function (req, res, next) {
        res.json({
            message: 'Successfully!',
            face: req.face,
        });
    } /*function handler*/,
);

// Template Engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'fa-solid fa-sort',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                            <i class="${icon}"></i>
                        </a>`;
            },
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

const userRouter = require('../routes/user');
const newsRouter = require('../routes/news');
const siteRouter = require('../routes/site');
const coursesRouter = require('../routes/courses');
function route(app) {
    app.use('/user', userRouter);
    app.use('/courses', coursesRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);

    // app.get('/', (req, res) => {
    //     res.render('home');
    // })

    // app.get('/news', (req, res) => {
    //     res.render('news');
    // })/*arrow function*/

    // app.get('/search', (req, res) => {
    // // console.log(req.query.q) /*lấy query parameters*/
    //     res.render('search');
    // })

    // app.post('/search', (req, res) => {
    //     // console.log(req.query.q) /*lấy query parameters*/
    //     console.log(req.body) /*lấy từ form data*/
    //     res.send("");
    // })
}

module.exports = route;

const userRouter = require('../routes/user');
const newsRouter = require('../routes/news');
const siteRouter = require('../routes/site');
const coursesRouter = require('../routes/courses');
function route(app) {
    app.use('/user', userRouter);
    app.use('/courses', coursesRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;

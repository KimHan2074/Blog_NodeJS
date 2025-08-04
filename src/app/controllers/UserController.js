const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class UserController {
    /*[GET] /stored/courses*/
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('user/stored-courses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new UserController();

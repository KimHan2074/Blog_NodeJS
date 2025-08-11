const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class UserController {
    /*[GET] /stored/courses*/
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (Object.hasOwn(req.query, '_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([
            courseQuery,
            Course.findWithDeleted({ deletedAt: { $ne: null } }),
        ])
            .then(([courses, deletedCourses]) => {
                // console.log(deletedCourses.length);

                res.render('user/stored-courses', {
                    courses: mutipleMongooseToObject(courses),
                    deletedCount: deletedCourses.length,
                });
            })
            .catch(next);
    }

    // /*[GET] /trash/courses*/
    trashCourses(req, res, next) {
        Course.findDeleted()
            .then((courses) => {
                const deletedCourses = courses.filter(
                    (course) => course.deleted === true,
                );
                res.render('user/trash-courses', {
                    courses: mutipleMongooseToObject(deletedCourses),
                });
            })
            .catch(next);
    }
}

module.exports = new UserController();

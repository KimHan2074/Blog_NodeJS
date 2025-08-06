const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class UserController {
    /*[GET] /stored/courses*/
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}), // Lấy danh sách khóa học chưa bị xóa
            Course.countDocumentsDeleted(), // Đếm số lượng đã bị xóa mềm
        ])
            .then(([courses, deletedCount]) => {
                res.render('user/stored-courses', {
                    courses: mutipleMongooseToObject(courses), // Sửa chính tả: mutiple -> multiple
                    deletedCount,
                });
            })
            .catch(next);
    }

    // /*[GET] /trash/courses*/
    trashCourses(req, res, next) {
        Course.findDeleted()
            .then((courses) => {
                console.log(courses); // kiểm tra có kết quả không
                res.render('user/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new UserController();

const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    /*[GET] /courses/:slug*/
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    /*[GET] /courses/create*/
    create(req, res, next) {
        res.render('courses/create');
    }

    /*[POST] /courses/store*/
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`;
        const course = new Course(formData);

        course
            .save()
            .then(() => res.redirect('/user/stored/courses'))
            .catch(next);
    }

    /*[GET] /courses/:id/edit*/
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    /*[PUT] /courses/:id/*/
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/user/stored/courses'))
            .catch(next);
    }

    /*[DELETE] /courses/:id/*/
    remove(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect(req.get('Referer')))
            .catch(next);
    }

    /*[DELETE] /courses/:id/force*/
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect(req.get('Referer')))
            .catch(next);
    }

    /*[PATCH] /:id/restore*/
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() =>
                res.redirect(req.get('Referer') || 'user/trash/courses'),
            )
            .catch(next);
    }

    /*[POST] /courses/handle-action-forms */
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'remove':
                console.log(req.body.courseIds);
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect(req.get('Referer')))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid!' });
        }
    }

    /*[POST] /courses/handle-action-forms-recyclebin */
    handleFormActionsRecycleBin(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                console.log(req.body.courseIds);
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() =>
                        res.redirect(
                            req.get('Referer') || 'user/trash/courses',
                        ),
                    )
                    .catch(next);
                break;
            case 'delete':
                console.log(req.body.courseIds);
                Course.deleteOne({ _id: req.params.courseIds })
                    .then(() => res.redirect(req.get('Referer')))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid!' });
        }
    }
}

module.exports = new CourseController();

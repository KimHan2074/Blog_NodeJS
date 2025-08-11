const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.patch('/:id/restore', courseController.restore);
router.post(
    '/handle-form-actions-recyclebin',
    courseController.handleFormActionsRecycleBin,
);
router.post('/handle-form-actions', courseController.handleFormActions);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.remove);
router.delete('/:id/force', courseController.forceDelete);
router.get('/:slug', courseController.show);

module.exports = router;

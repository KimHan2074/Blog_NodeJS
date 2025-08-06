const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.get('/trash/courses', userController.trashCourses);
router.get('/stored/courses', userController.storedCourses);

module.exports = router;

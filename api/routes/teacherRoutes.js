import express from 'express';
import SchoolController from '../controllers/schoolController.js';
const router = express.Router();
import TeacherController, { getSchools } from '../controllers/teacherController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

// ROute Level Middleware - To Protect Route
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)

// Public Routes
router.post('/register', TeacherController.userRegistration)
router.post('/login', TeacherController.userLogin)
router.post('/send-reset-password-email', TeacherController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', TeacherController.userPasswordReset)

// Protected Routes
router.post('/changepassword', TeacherController.changeUserPassword)
router.get('/loggeduser', TeacherController.loggedUser)

// custom work started
// router.get("/users", TeacherController.getUsers)
router.get("/teachers", TeacherController.getUsers)
router.get("/api/schools", getSchools)
// custom work ended


export default router
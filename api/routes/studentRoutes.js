import express from 'express';
// import StudentController from '../controllers/studentController.js';
const router = express.Router();
import StudentController, { getSchools } from '../controllers/studentController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

// ROute Level Middleware - To Protect Route
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)

// Public Routes
router.post('/register', StudentController.userRegistration)
router.post('/login', StudentController.userLogin)
router.post('/send-reset-password-email', StudentController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', StudentController.userPasswordReset)

// Protected Routes
router.post('/changepassword', StudentController.changeUserPassword)
router.get('/loggeduser', StudentController.loggedUser)

// custom work started
// router.get("/users", TeacherController.getUsers)
router.get("/students", StudentController.getUsers)
router.get("/api/schools", getSchools)
// custom work ended


export default router
import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

// ROute Level Middleware - To Protect Route
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)

// Public Routes
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)

// Protected Routes
router.post('/changepassword', UserController.changeUserPassword)
router.get('/loggeduser', UserController.loggedUser)

// custom work started
router.get("/users", UserController.getUsers)
router.get("/admins", UserController.getRoleAdmin)
router.get("/schools", UserController.getRoleSchool)
router.get("/teachers", UserController.getRoleTeacher)
router.get("/students", UserController.getRoleStudent)
// custom work ended


export default router
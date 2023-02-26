import express from 'express';
const router = express.Router();
import SchoolController from '../controllers/schoolController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

// ROute Level Middleware - To Protect Route
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)

// Public Routes
router.post('/register', SchoolController.userRegistration)
router.post('/login', SchoolController.userLogin)
router.post('/send-reset-password-email', SchoolController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', SchoolController.userPasswordReset)

// Protected Routes
router.post('/changepassword', SchoolController.changeUserPassword)
router.get('/loggeduser', SchoolController.loggedUser)

// custom work started
// router.get("/users", SchoolController.getUsers)
router.get("/schools", SchoolController.getUsers)
// custom work ended


export default router
import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/authMiddleware.js';

import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from '../controllers/authControllers.js';

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

//Forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

//test routes
router.get('/test', requireSignIn, isAdmin, testController);

export default router;

import express from 'express';
import { createMovieController } from '../controllers/movieController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';

//router object
const router = express.Router();

//routes
//create category
router.post(
  '/create-movie',
  requireSignIn,
  isAdmin,
  formidable(),
  createMovieController
);

export default router;

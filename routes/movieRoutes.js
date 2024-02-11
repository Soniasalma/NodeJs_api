import express from 'express';
import {
  createMovieController,
  deleteMovieController,
  getMoviesController,
  getSingleMovieByIdController,
  getSingleMovieBySlugController,
} from '../controllers/movieController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';

//router object
const router = express.Router();

//routes
//create movie
router.post(
  '/create-movie',
  requireSignIn,
  isAdmin,
  formidable(),
  createMovieController
);

//get movies

router.get('/get-movie', getMoviesController);
//get single movie by slug
router.get('/get-movie/:slug', getSingleMovieBySlugController);

//get single movie by id
router.get('/get-movie/:id', getSingleMovieByIdController);

//delete movie
router.delete(
  '/delete-movie/:id',
  requireSignIn,
  isAdmin,
  deleteMovieController
);

export default router;

import slugify from 'slugify';
import movieModel from '../models/movieModel.js';
import fs from 'fs';

export const createMovieController = async (req, res) => {
  try {
    const {
      title,
      adult,
      backdrop_path,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      video,
      vote_average,
      vote_count,
      category,
    } = req.fields;
    // const {photo}=req.files

    //validation
    switch (true) {
      case !title:
        return res.status(500).send({ error: 'Title is Required' });
      case !adult:
        return res.status(500).send({ error: 'Name is Required' });
      case !backdrop_path:
        return res.status(500).send({ error: 'Backdrop path is Required' });
      case !original_language:
        return res.status(500).send({ error: 'Original language is Required' });
      case !original_title:
        return res.status(500).send({ error: 'Original title is Required' });
      case !overview:
        return res.status(500).send({ error: 'Overview is Required' });
      case !popularity:
        return res.status(500).send({ error: 'Popularity is Required' });
      case !poster_path:
        return res.status(500).send({ error: 'Poster path is Required' });
      case !release_date:
        return res.status(500).send({ error: 'release_date is Required' });
      case !video:
        return res.status(500).send({ error: 'Video is Required' });
      case !vote_average:
        return res.status(500).send({ error: 'Vote average is Required' });
      case !vote_count:
        return res.status(500).send({ error: 'Vote count is Required' });
      case !category:
        return res.status(500).send({ error: 'Category is Required' });
    }
    const movies = new movieModel({ ...req.fields, slug: slugify(title) });
    await movies.save();
    res.status(201).send({
      success: true,
      message: 'Movie created successfuly',
      movies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in creating movie',
    });
  }
};

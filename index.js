const express = require('express');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();
const port = process.env.PORT;
const connectionString = process.env.CONNECTION_STRING;
const Test = require('./models/Test');
const Movie = require('./models/Movie');

mongoose
  .connect(connectionString)
  .then(() => {
    console.log('connected successfully');
  })
  .catch((error) => {
    console.log('error with connecting with the DB ', error);
  });

//mongodb+srv://soniayelimar:<password>@clusternodejs.bpllcrb.mongodb.net/?retryWrites=true&w=majority

app.get('/hello', (req, res) => {
  res.send('hello');
});
app.get('/', (req, res) => {
  res.send('hello in node js project');
});
app.listen(3000, () => {
  console.log(`I am listening in port ${port}`);
});

// ======= ARTICLES ENDPOINTS =====
app.post('/tests', async (req, res) => {
  const newTest = new Test();

  const testTitle = req.body.testTitle;
  const testBody = req.body.testBody;

  newTest.title = testTitle;
  newTest.body = testBody;

  await newTest.save();

  res.json(newTest);
});

// ======= Movies ENDPOINTS =====
app.post('/movies', async (req, res) => {
  const newMovie = new Movie();

  const movAdult = req.body.movAdult;
  const movBackdrop_path = req.body.movBackdrop_path;
  const movGenre_ids = req.body.movGenre_ids;
  const movOriginal_language = req.body.movOriginal_language;
  const movOriginal_title = req.body.movOriginal_title;
  const movOverview = req.body.movOverview;
  const movPopularity = req.body.movPopularity;
  const movPoster_path = req.body.movPoster_path;
  const movRelease_date = req.body.movRelease_date;
  const movTitle = req.body.movTitle;
  const movVideo = req.body.movVideo;
  const movVote_average = req.body.movVote_average;
  const movVote_count = req.body.movVote_count;

  newMovie.adult = movAdult;
  newMovie.backdrop_path = movBackdrop_path;
  newMovie.genre_ids = movGenre_ids;
  newMovie.original_language = movOriginal_language;
  newMovie.original_title = movOriginal_title;
  newMovie.overview = movOverview;
  newMovie.popularity = movPopularity;
  newMovie.poster_path = movPoster_path;
  newMovie.release_date = movRelease_date;
  newMovie.title = movTitle;
  newMovie.video = movVideo;
  newMovie.vote_average = movVote_average;
  newMovie.vote_count = movVote_count;
  try {
    await newMovie.save();

    res.json(newMovie);
    return;
  } catch (error) {
    console.log('error while adding a movie to the database');
    return res.send(error);
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    console.log('the movies are', movies);

    res.json(movies);
    return;
  } catch (error) {
    console.log('error while reading movies ');
    return res.send('error');
  }
});

app.get('/movies/:movieId', async (req, res) => {
  const id = req.params.movieId;

  try {
    const movie = await Movie.findById(id);
    res.json(movie);
    return;
  } catch (error) {
    console.log('error while reading movie of id ', id);
    return res.send('error');
  }
});

app.delete('/movies/:movieId', async (req, res) => {
  const id = req.params.movieId;

  try {
    const movie = await Movie.findByIdAndDelete(id);
    res.json(movie);
    return;
  } catch (error) {
    console.log('error while reading article of id ', id);
    return res.json(error);
  }
});

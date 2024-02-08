import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const movieSchema = new Schema({
  adult: Boolean,
  backdrop_path: String,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;

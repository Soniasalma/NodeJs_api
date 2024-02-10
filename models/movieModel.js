import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const movieSchema = new Schema(
  {
    /* adult: Boolean,
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
vote_count: Number,*/
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    adult: {
      type: Boolean,
      required: true,
    },
    backdrop_path: {
      type: String,
      required: true,
    },
    original_language: {
      type: String,
      required: true,
    },
    original_title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    popularity: {
      type: Number,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    video: {
      type: Boolean,
      required: true,
    },
    vote_average: {
      type: Number,
      required: true,
    },
    vote_count: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
);

const movieModel = mongoose.model('movieModel', movieSchema);

export default movieModel;

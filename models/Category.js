import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});
const Category = mongoose.model('Category', categorySchema);
export default Category;

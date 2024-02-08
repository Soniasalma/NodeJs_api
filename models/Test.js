import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const testSchema = new Schema({
  title: String,
  body: String,
});

const Test = mongoose.model('Test', testSchema);

export default Test;

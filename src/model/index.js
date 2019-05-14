import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useFindAndModify: false});
};

export { connectDb };

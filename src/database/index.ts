import mongoose from 'mongoose';
import {config} from '../config';

export const connectMongoose = async () => {
  try {
    console.log(config.databaseUrl);
    await mongoose.connect(config.databaseUrl!);
    console.log('mongoose.js: ' + 'Successfully connected to mongo database!!');
  } catch (error) {
    console.log(error);
  }
};

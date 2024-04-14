import mongoose, { Mongoose } from 'mongoose';

interface CachedData {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: CachedData = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDb(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // connection options
    };
    cached.promise = mongoose.connect(process.env.MONGO_URL!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDb;
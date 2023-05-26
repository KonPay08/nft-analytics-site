import mongoose from 'mongoose';

let cachedDb: mongoose.Mongoose | null = null;
const URL = process.env.MONGODB_URI;

export async function connectToDatabase() {
  if (!URL) throw new Error("Please define the NEXT_PUBLIC_MONGODB_URI environment variable");
  if (cachedDb) return cachedDb;
  if (!cachedDb) cachedDb = await mongoose.connect(URL);
  return cachedDb;
}

import mongoose from 'mongoose';

const { MONGO_DB_URL } = process.env;

const connectToDatabase = (
    mongoDatabaseURI = MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI || 'error' );

export default connectToDatabase;
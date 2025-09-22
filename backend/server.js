
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, clientOptions).then((mongoose) => {
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Middleware to ensure DB connection for every request
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    res.status(500).json({ error: 'Failed to connect to database' });
  }
});

app.use('/api/notes', require('./routes/notes'));

module.exports = app;
 
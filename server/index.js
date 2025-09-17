const path = require('path');
const express = require('express');
require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });

const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

// Connect to MongoDB
const app = express();

connectDB();

// Enable CORS for dev and production frontends
app.use(cors({
  origin: [
    'http://localhost:5137', // Vite Development
    'https://threadup-app.vercel.app',   // Vercel Production
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // allows sending cookies / auth headers
}));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) =>
  res.send(`Server running on http://localhost:${process.env.PORT || 5000}`)
);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
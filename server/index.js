const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
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
    'http://localhost:5137',               // Vite dev server
    'https://threadup-app.vercel.app/',   // Vercel frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // allows sending cookies / auth headers
}));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send(`Server running on http://localhost:${process.env.PORT || 5000}`));
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server started on port http://localhost:${port}`));
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port http://localhost:${PORT}`));
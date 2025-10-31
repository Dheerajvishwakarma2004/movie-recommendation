// routes/movieRoutes.js
const express = require('express');
const { fetchMovies, fetchTrendingMovies, getMovieDetails, rateMovie, getUserRatings } = require('../controllers/movieController');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware for JWT authentication

// Fetch all movies
router.get('/fetch', fetchMovies);

// Fetch trending movies
router.get('/trending', fetchTrendingMovies);

// Get movie details
router.get('/:id', getMovieDetails);

// Rate a movie
router.post('/rate', auth, rateMovie);

// Get user's ratings
router.get('/ratings', auth, getUserRatings);

module.exports = router;
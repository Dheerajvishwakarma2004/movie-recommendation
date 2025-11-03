// routes/movieRoutes.js
const express = require('express');
const { fetchMovies, fetchTrendingMovies, getMovieDetails, rateMovie, getUserRatings, searchMovies } = require('../controllers/movieController');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware for JWT authentication

// Fetch all movies
router.get('/fetch', fetchMovies);

// Fetch trending movies
router.get('/trending', fetchTrendingMovies);

// Search movies - must be before /:id route to avoid matching /search as an ID
router.get('/search', searchMovies);

// Rate a movie
router.post('/rate', auth, rateMovie);

// Get user's ratings
router.get('/ratings', auth, getUserRatings);

// Get movie details - must be last to avoid matching other routes
router.get('/:id', getMovieDetails);

module.exports = router;

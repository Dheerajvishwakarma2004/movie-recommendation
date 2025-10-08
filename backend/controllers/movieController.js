// controllers/movieController.js
const Movie = require('../models/movie');
const Rating = require('../models/rating');

// Fetch all movies
exports.fetchMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json({ movies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch trending movies
exports.fetchTrendingMovies = async (req, res) => {
    try {
        const trendingMovies = await Movie.find({ trending: true }); // Fetch movies where trending is true
        res.status(200).json({ movies: trendingMovies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch movie details
exports.getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Rate a movie
exports.rateMovie = async (req, res) => {
    try {
        const { movieId, rating } = req.body;
        const userId = req.user.id; // Authenticated user ID

        // Validate rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        // Check if the movie exists
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Save the rating to the Rating collection
        const newRating = new Rating({ userId, movieId, rating });
        await newRating.save();

        // Update the movie's ratings array and average rating
        movie.ratings.push(rating); // Add the new rating to the array
        const totalRatings = movie.ratings.length;
        const sumRatings = movie.ratings.reduce((sum, r) => sum + r, 0);
        movie.averageRating = sumRatings / totalRatings; // Recalculate average rating

        await movie.save(); // Save the updated movie

        res.status(201).json({ message: 'Rating saved', newRating, averageRating: movie.averageRating });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user's ratings
exports.getUserRatings = async (req, res) => {
    try {
        const userId = req.user.id;
        const ratings = await Rating.find({ userId }).populate('movieId');
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
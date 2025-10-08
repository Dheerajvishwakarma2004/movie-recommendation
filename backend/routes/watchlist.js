const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Movie = require('../models/movie'); // Ensure this is imported
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// Get user's watchlist
router.get('/', auth, async (req, res) => {
    try {
      console.log('Fetching watchlist for user:', req.user.id); // Log the user ID
      const user = await User.findById(req.user.id).populate('watchlist');
      res.json(user.watchlist);
    } catch (error) {
      console.error('Error in /watchlist route:', error); // Log the error
      res.status(500).json({ error: 'Server error' });
    }
  });

// Add or remove a movie from watchlist
router.post('/toggle', auth, async (req, res) => {
    const { movieId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({ error: 'Invalid movie ID' });
    }

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const user = await User.findById(req.user.id);
        const index = user.watchlist.indexOf(movieId);

        if (index === -1) {
            user.watchlist.push(movieId); // Add movie
        } else {
            user.watchlist.splice(index, 1); // Remove movie
        }

        await user.save();
        res.json(user.watchlist);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
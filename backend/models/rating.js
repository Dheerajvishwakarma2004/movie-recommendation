// models/rating.js
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who rated the movie
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true }, // Movie being rated
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating value (1-5)
});

module.exports = mongoose.model('Rating', ratingSchema);
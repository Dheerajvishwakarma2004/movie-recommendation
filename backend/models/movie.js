const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieId: { type: String, required: true, unique: true }, 
    title: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }, 
    platformUrl: { type: String, required: true }, 
    trending: { type: Boolean, default: false },
    ratings: { type: [Number], default: [] },
    averageRating: { type: Number, default: 0 },
    imdbRating: { type: Number, default: 0 },  // IMDb rating
    director: { type: String, required: true }, // Director name
    cast: { type: [String], required: true }   // List of cast members
});



module.exports = mongoose.model('Movie', movieSchema);

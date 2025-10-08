// seed.js
const mongoose = require('mongoose');
const Movie = require('./models/movie'); // Adjust the path to your Movie model
require('dotenv').config();

// Sample movie data (60 movies)
const movies = [
    {
        movieId: 'tt1375666',
        title: 'Inception',
        genre: 'Sci-Fi',
        year: 2010,
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        platformUrl: 'https://www.imdb.com/title/tt1375666/',
        trending: true, // Trending
        imdbRating: 8.8,
        director: 'Christopher Nolan',
        cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page']
    },
    {
        movieId: 'tt0468569',
        title: 'The Dark Knight',
        genre: 'Action',
        year: 2008,
        description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
        platformUrl: 'https://www.imdb.com/title/tt0468569/',
        trending: true, // Trending
        imdbRating: 9.0,
        director: 'Christopher Nolan',
        cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart']
    },
    {
        movieId: 'tt0111161',
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        year: 1994,
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        platformUrl: 'https://www.imdb.com/title/tt0111161/',
        trending: false, // Not trending
        imdbRating: 9.3,
        director: 'Frank Darabont',
        cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton']
    },
    {
        movieId: 'tt0133093',
        title: 'The Matrix',
        genre: 'Sci-Fi',
        year: 1999,
        description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        platformUrl: 'https://www.imdb.com/title/tt0133093/',
        trending: false, // Not trending
        imdbRating: 8.7,
        director: 'Lana Wachowski, Lilly Wachowski',
        cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss']
    },
    {
        movieId: 'tt0816692',
        title: 'Interstellar',
        genre: 'Sci-Fi',
        year: 2014,
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        platformUrl: 'https://www.imdb.com/title/tt0816692/',
        trending: true, // Trending
        imdbRating: 8.6,
        director: 'Christopher Nolan',
        cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain']
    },
    // Add IMDb rating, director, and cast to other movies similarly
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    // Insert sample movies
    return Movie.insertMany(movies);
})
.then(() => {
    console.log('Movies inserted successfully');
    mongoose.connection.close(); // Close the connection
})
.catch((error) => {
    console.error('Error seeding database:', error);
    mongoose.connection.close(); // Close the connection
});

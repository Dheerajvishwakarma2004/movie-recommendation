import axios from 'axios';

const API_URL = 'https://movie-recommendation-backend-steel.vercel.app/api';

// Authentication APIs
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

// Movie APIs
export const fetchMovies = async () => {
    const response = await axios.get(`${API_URL}/movies/fetch`);
    return response.data.movies;
};

export const fetchTrendingMovies = async () => {
    const response = await axios.get(`${API_URL}/movies/trending`);
    return response.data.movies;
};

export const getMovieDetails = async (id) => {
    const response = await axios.get(`${API_URL}/movies/${id}`);
    return response.data;
};

export const rateMovie = async (movieData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/movies/rate`, movieData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error rating movie:', error.response?.data?.error || error.message);
        throw error;
    }
};

export const getUserRatings = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/movies/ratings`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// ✅ Watchlist APIs using toggle
export const getWatchlist = async () => {
    try {
        const response = await axios.get(`${API_URL}/watchlist`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        throw error;
    }
};

// Toggle movie in watchlist
export const toggleWatchlist = async (movieId) => {
    try {
        const response = await axios.post(
            `${API_URL}/watchlist/toggle`,
            { movieId },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error toggling watchlist:', error);
        throw error;
    }
};

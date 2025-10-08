import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import MovieList from './components/MovieList';
import MovieRating from './components/MovieRating';
import WatchList from './components/WatchList';  // ✅ Import Watchlist
import Recommendations from './components/Recommendations';
import Auth from './components/Auth';
import Footer from './components/Footer';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/movies" element={<MovieList />} />
                    <Route path="/rate/:id" element={<MovieRating />} />
                    <Route path="/recommendations" element={<Recommendations />} />
                    <Route path="/watchlist" element={<WatchList />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
                <Footer />
            </Router>
        </ThemeProvider>
    );
};

export default App;
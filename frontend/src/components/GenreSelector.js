// src/components/GenreSelector.js
import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../api'; // Use fetchMovies instead of getMovies
import { FormGroup, FormControlLabel, Checkbox, Typography, Paper, Container } from '@mui/material';

const GenreSelector = ({ onSelectGenres }) => {
    const [movies, setMovies] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMoviesData = async () => {
            try {
                const data = await fetchMovies(); // Use fetchMovies
                setMovies(data);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
                setError('Failed to fetch movies. Please try again later.');
            }
        };
        fetchMoviesData();
    }, []);

    const genres = Array.from(new Set(movies.flatMap(movie => movie.genre)));

    const handleGenreChange = (genre) => {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
        );
    };

    useEffect(() => {
        onSelectGenres(selectedGenres);
    }, [selectedGenres, onSelectGenres]);

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h5" gutterBottom>
                    Select Genres
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <FormGroup>
                    {genres.map((genre) => (
                        <FormControlLabel
                            key={genre}
                            control={
                                <Checkbox
                                    checked={selectedGenres.includes(genre)}
                                    onChange={() => handleGenreChange(genre)}
                                />
                            }
                            label={genre}
                        />
                    ))}
                </FormGroup>
            </Paper>
        </Container>
    );
};

export default GenreSelector;
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
            <Paper elevation={0} sx={{
                padding: '2rem',
                marginTop: '2rem',
                background: 'linear-gradient(135deg, #1a1f3a 0%, #232d4d 100%)',
                border: '1px solid rgba(100, 181, 246, 0.3)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            }}>
                <Typography variant="h5" gutterBottom sx={{
                    fontWeight: 700,
                    color: '#ffffff',
                }}>
                    Select Genres
                </Typography>
                {error && (
                    <Typography sx={{
                        color: '#ef5350',
                        mb: 2,
                        backgroundColor: 'rgba(244, 67, 54, 0.15)',
                        padding: '0.75rem',
                        borderRadius: 1,
                    }}>
                        {error}
                    </Typography>
                )}
                <FormGroup sx={{ gap: 1 }}>
                    {genres.map((genre) => (
                        <FormControlLabel
                            key={genre}
                            control={
                                <Checkbox
                                    checked={selectedGenres.includes(genre)}
                                    onChange={() => handleGenreChange(genre)}
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        '&.Mui-checked': {
                                            color: '#64b5f6',
                                        },
                                    }}
                                />
                            }
                            label={genre}
                            sx={{
                                color: '#b0b9c3',
                                '&:hover': {
                                    color: '#64b5f6',
                                },
                            }}
                        />
                    ))}
                </FormGroup>
            </Paper>
        </Container>
    );
};

export default GenreSelector;

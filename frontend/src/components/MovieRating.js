// src/components/MovieRating.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { rateMovie } from '../api';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';

const MovieRating = () => {
    const { id } = useParams();
    const [rating, setRating] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await rateMovie({ movieId: id, rating });
            setMessage('Rating submitted!');
            setError('');
        } catch (error) {
            setError('Failed to submit rating. Please try again.');
            setMessage('');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Rate Movie
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Rating (1-5)"
                        variant="outlined"
                        margin="normal"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        inputProps={{ min: 1, max: 5 }}
                        required
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1rem' }}
                    >
                        Submit Rating
                    </Button>
                </form>
                {message && <Typography color="primary">{message}</Typography>}
                {error && <Typography color="error">{error}</Typography>}
            </Paper>
        </Container>
    );
};

export default MovieRating;
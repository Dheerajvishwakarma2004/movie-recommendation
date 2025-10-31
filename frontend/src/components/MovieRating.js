import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { rateMovie, fetchMovies } from '../api';
import { Box, Button, Typography, Container, Paper, Alert, CircularProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const MovieRating = () => {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const movies = await fetchMovies();
                const foundMovie = movies.find(m => m._id === id);
                setMovie(foundMovie);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        fetchMovie();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        setLoading(true);
        try {
            await rateMovie({ movieId: id, rating });
            setMessage('Rating submitted successfully! Thank you for your feedback.');
            setError('');
            setRating(0);
            setTimeout(() => setMessage(''), 5000);
        } catch (error) {
            setError('Failed to submit rating. Please try again.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    const displayRating = hoverRating || rating;

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh', py: 4 }}>
            <Paper elevation={0} sx={{
                padding: 4,
                width: '100%',
                borderRadius: 2,
                background: 'linear-gradient(135deg, #1a1f3a 0%, #232d4d 100%)',
                border: '1px solid rgba(100, 181, 246, 0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
            }}>
                <Box textAlign="center" mb={4}>
                    <Typography variant="h4" gutterBottom sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #64b5f6 0%, #ff4081 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        Rate This Movie
                    </Typography>
                    {movie && (
                        <Typography variant="h6" sx={{ color: '#b0b9c3', mt: 1 }}>
                            {movie.title}
                        </Typography>
                    )}
                </Box>

                {movie && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <Box sx={{
                            width: 150,
                            height: 200,
                            borderRadius: 1,
                            backgroundImage: `url(${movie.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                            border: '2px solid rgba(100, 181, 246, 0.3)',
                        }} />
                    </Box>
                )}

                <form onSubmit={handleSubmit}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="body1" sx={{ color: '#b0b9c3', mb: 2 }}>
                            How would you rate this movie?
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 1,
                            mb: 2,
                        }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Box
                                    key={star}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                    sx={{
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease-in-out',
                                        transform: (displayRating >= star) ? 'scale(1.2)' : 'scale(1)',
                                    }}
                                >
                                    <StarIcon sx={{
                                        fontSize: 48,
                                        color: (displayRating >= star) ? '#ffc107' : '#8a92a0',
                                        filter: (displayRating >= star) ? 'drop-shadow(0 0 8px rgba(255, 193, 7, 0.5))' : 'none',
                                        transition: 'all 0.2s ease-in-out',
                                    }} />
                                </Box>
                            ))}
                        </Box>

                        {displayRating > 0 && (
                            <Typography variant="body2" sx={{ color: '#64b5f6', fontWeight: 600 }}>
                                Your Rating: {displayRating} out of 5 stars
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading || rating === 0}
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                background: rating === 0 ? 'rgba(25, 118, 210, 0.5)' : 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                                '&:hover': {
                                    background: rating === 0 ? 'rgba(25, 118, 210, 0.5)' : 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                                },
                            }}
                        >
                            {loading ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CircularProgress size={20} color="inherit" />
                                    Submitting...
                                </Box>
                            ) : (
                                'Submit Rating'
                            )}
                        </Button>
                    </Box>
                </form>

                {message && (
                    <Alert severity="success" sx={{ mt: 3, backgroundColor: 'rgba(76, 175, 80, 0.15)', color: '#81c784' }}>
                        {message}
                    </Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{ mt: 3, backgroundColor: 'rgba(244, 67, 54, 0.15)', color: '#ef5350' }}>
                        {error}
                    </Alert>
                )}
            </Paper>
        </Container>
    );
};

export default MovieRating;

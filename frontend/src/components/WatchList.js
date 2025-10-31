import React, { useState, useEffect } from 'react';
import { getWatchlist, toggleWatchlist } from '../api';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const WatchList = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggling, setToggling] = useState(null);
    const [error, setError] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const data = await getWatchlist();
                setWatchlist(data);
            } catch (error) {
                setError('Failed to fetch watchlist. Please try again later.');
                setSnackbar({ open: true, message: 'Failed to fetch watchlist' });
            } finally {
                setLoading(false);
            }
        };
        fetchWatchlist();
    }, []);

    const handleConfirmOpen = (movie) => {
        setSelectedMovie(movie);
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
        setSelectedMovie(null);
    };

    const handleToggle = async () => {
        if (!selectedMovie) return;
        
        setConfirmOpen(false);
        setToggling(selectedMovie._id);
        
        try {
            await toggleWatchlist(selectedMovie._id);
            // Refetch the updated watchlist
            const updatedWatchlist = await getWatchlist();
            setWatchlist(updatedWatchlist);
            setSnackbar({ open: true, message: 'Removed from watchlist' });
        } catch (error) {
            setError('Failed to update watchlist. Please try again.');
            setSnackbar({ open: true, message: 'Failed to remove item' });
        } finally {
            setToggling(null);
            setSelectedMovie(null);
        }
    };
    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 4,
                background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(220, 0, 78, 0.1) 100%)',
                padding: '2rem',
                borderRadius: 2,
                border: '1px solid rgba(100, 181, 246, 0.3)',
            }}>
                <Typography variant="h4" component="h1" sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #64b5f6 0%, #ff4081 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    My Watchlist
                </Typography>
                {watchlist.length > 0 && (
                    <Typography sx={{
                        ml: 'auto',
                        backgroundColor: 'rgba(100, 181, 246, 0.2)',
                        color: '#64b5f6',
                        padding: '0.5rem 1rem',
                        borderRadius: 2,
                        fontWeight: 600,
                    }}>
                        {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'}
                    </Typography>
                )}
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            ) : watchlist.length > 0 ? (
                <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={3}>
                    {watchlist.map((movie) => (
                        <Card
                            key={movie._id}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 2,
                                overflow: 'hidden',
                                position: 'relative',
                                background: 'linear-gradient(135deg, #1a1f3a 0%, #232d4d 100%)',
                                border: '1px solid rgba(100, 181, 246, 0.2)',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    boxShadow: '0 12px 32px rgba(25, 118, 210, 0.3)',
                                    borderColor: 'rgba(100, 181, 246, 0.5)',
                                    transform: 'translateY(-6px)',
                                }
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="250"
                                image={movie.imageUrl || '/placeholder-movie.jpg'}
                                alt={movie.title}
                                sx={{ objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.src = '/placeholder-movie.jpg';
                                }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {movie.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {movie.genre} · {movie.year}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        href={movie.platformUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Watch
                                    </Button>

                                    <IconButton
                                        color="error"
                                        aria-label="remove from watchlist"
                                        onClick={() => handleConfirmOpen(movie)}
                                        disabled={toggling === movie._id}
                                    >
                                        {toggling === movie._id ? (
                                            <CircularProgress size={20} />
                                        ) : (
                                            <DeleteIcon />
                                        )}
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (
                <Box sx={{
                    textAlign: 'center',
                    py: 6,
                    background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(220, 0, 78, 0.05) 100%)',
                    borderRadius: 2,
                    border: '1px solid rgba(100, 181, 246, 0.2)',
                }}>
                    <Typography variant="h6" sx={{ color: '#b0b9c3', mb: 1 }}>
                        Your watchlist is empty
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#8a92a0' }}>
                        Start adding movies to see them here!
                    </Typography>
                </Box>
            )}

            {/* Confirmation Dialog */}
            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Remove from Watchlist?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to remove "{selectedMovie?.title}" from your watchlist?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>Cancel</Button>
                    <Button onClick={handleToggle} color="error" autoFocus>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default WatchList;

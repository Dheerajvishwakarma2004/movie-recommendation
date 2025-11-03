import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies, toggleWatchlist, getWatchlist } from '../api';
import { 
    Container, Typography, Grid, Card, CardMedia, CardContent, Button, Dialog, 
    DialogTitle, DialogContent, Box, CircularProgress 
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import GenreSelector from './GenreSelector';

const Recommendations = ({ mode = 'genre', watchlist: initialWatchlist }) => {
    const [movies, setMovies] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [watchlist, setWatchlist] = useState(initialWatchlist || []);
    const [toggling, setToggling] = useState(null);

    // Fetch watchlist on component mount if not provided
    useEffect(() => {
        if (!initialWatchlist) {
            const fetchWatchlistData = async () => {
                try {
                    const watchlistData = await getWatchlist();
                    setWatchlist(watchlistData);
                } catch (error) {
                    console.warn("Error fetching watchlist, may not be logged in:", error);
                    setWatchlist([]);
                }
            };
            fetchWatchlistData();
        }
    }, [initialWatchlist]);

    // Handle genre selection (for genre-based mode)
    const handleGenreSelect = async (genres) => {
        setSelectedGenres(genres);
        if (genres.length > 0) {
            try {
                const allMovies = await fetchMovies();
                const filteredMovies = allMovies.filter(movie =>
                    genres.includes(movie.genre)
                );
                setMovies(filteredMovies.sort((a, b) => b.averageRating - a.averageRating));
                setMessage('');
            } catch (error) {
                console.error("Error fetching movies:", error);
                setMessage('Failed to fetch movies. Please check your network connection or try again later.');
            }
        } else {
            setMovies([]);
            setMessage('Please select at least one genre.');
        }
    };

    // Fetch recommended movies based on watchlist (for watchlist-based mode)
// Update the useEffect for watchlist-based recommendations
useEffect(() => {
    const fetchRecommendedMovies = async () => {
        try {
            // First ensure we have the latest watchlist
            const currentWatchlist = initialWatchlist || await getWatchlist();
            setWatchlist(currentWatchlist);

            if (mode === 'watchlist' && currentWatchlist?.length > 0) {
                // Extract genres and cast from the watchlist
                const genres = currentWatchlist.flatMap(movie => movie.genre.split(', '));
                const cast = currentWatchlist.flatMap(movie => movie.cast);

                // Fetch all movies
                const allMovies = await fetchMovies();

                // Filter movies based on matching genres or cast
                const filteredMovies = allMovies.filter(movie =>
                    genres.some(genre => movie.genre.includes(genre)) ||
                    cast.some(actor => movie.cast.includes(actor))
                );

                // Sort by average rating
                setMovies(filteredMovies.sort((a, b) => b.averageRating - a.averageRating));
                setMessage('');
            } else if (mode === 'watchlist') {
                setMessage('Add movies to your watchlist to get recommendations');
                setMovies([]);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            setMessage('Failed to fetch movies. Please check your network connection or try again later.');
        }
    };

    fetchRecommendedMovies();
}, [mode, initialWatchlist]);

// Remove the separate useEffect for fetching watchlist
// (we're now handling it in the above useEffect)

    const handleOpenPopup = (movie) => {
        setSelectedMovie(movie);
    };

    const handleClosePopup = () => {
        setSelectedMovie(null);
    };

    const handleToggleWatchlist = async (movie) => {
        setToggling(movie._id);
        try {
            await toggleWatchlist(movie._id);
            const updatedWatchlist = await getWatchlist();
            setWatchlist(updatedWatchlist);
        } catch (error) {
            console.error("Error updating watchlist:", error);
            setMessage('Failed to update watchlist. Please try again.');
        } finally {
            setToggling(null);
        }
    };

    return (
        <Container maxWidth="lg">
            {/* Genre Selector (for genre-based mode) */}
            {mode === 'genre' && (
                <>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 4,
                        mt: 4,
                        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(220, 0, 78, 0.1) 100%)',
                        padding: '2rem',
                        borderRadius: 2,
                        border: '1px solid rgba(100, 181, 246, 0.3)',
                    }}>
                        <Typography variant="h4" sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #64b5f6 0%, #ff4081 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Select Genres for Recommendations
                        </Typography>
                    </Box>
                    <GenreSelector onSelectGenres={handleGenreSelect} />
                </>
            )}

            {/* Recommendations Section */}
            {message && <Typography color="error">{message}</Typography>}

            {(mode === 'genre' && selectedGenres.length > 0) || (mode === 'watchlist' && movies.length > 0) ? (
                <>
                    <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                        {mode === 'genre' ? 'Recommended Movies' : ''}
                    </Typography>
                    <Grid container spacing={3}>
                        {movies.map((movie) => (
                            <Grid item key={movie._id} xs={12} sm={6} md={4} lg={3}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        background: 'linear-gradient(135deg, #1a1f3a 0%, #232d4d 100%)',
                                        border: '1px solid rgba(100, 181, 246, 0.2)',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-6px)',
                                            borderColor: 'rgba(100, 181, 246, 0.5)',
                                            boxShadow: '0 12px 32px rgba(25, 118, 210, 0.3)',
                                        }
                                    }}
                                    onClick={() => handleOpenPopup(movie)}
                                >
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={movie.imageUrl}
                                        alt={movie.title}
                                        sx={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            backgroundColor: '#f5f5f5'
                                        }}
                                    />
                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            background: 'linear-gradient(135deg, #1a1f3a 0%, #232d4d 100%)',
                                            borderTop: '1px solid rgba(100, 181, 246, 0.2)'
                                        }}
                                    >
                                        {/* Movie Title and Ratings */}
                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                            <Typography variant="h6" gutterBottom sx={{ 
                                                fontWeight: 'bold',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                maxWidth: '60%'
                                            }}>
                                                {movie.title}
                                            </Typography>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Tooltip title="IMDb Rating">
                                                    <Typography variant="body2" sx={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center',
                                                        backgroundColor: 'rgba(245, 197, 24, 0.2)',
                                                        px: 1,
                                                        borderRadius: 1
                                                    }}>
                                                        <StarIcon sx={{ fontSize: 16, color: '#f5c518', mr: 0.5 }} />
                                                        {movie.imdbRating ? movie.imdbRating.toFixed(1) : 'N/A'}
                                                    </Typography>
                                                </Tooltip>
                                                <Tooltip title="Platform Rating">
                                                    <Typography variant="body2" sx={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center',
                                                        backgroundColor: 'rgba(63, 81, 181, 0.1)',
                                                        px: 1,
                                                        borderRadius: 1
                                                    }}>
                                                        <StarIcon sx={{ fontSize: 16, color: '#3f51b5', mr: 0.5 }} />
                                                        {movie.averageRating ? movie.averageRating.toFixed(1) : 'N/A'}
                                                    </Typography>
                                                </Tooltip>
                                            </Box>
                                        </Box>

                                        {/* Genre and Year */}
                                        <Typography variant="body2" color="textSecondary" sx={{ 
                                            mb: 1,
                                            fontStyle: 'italic',
                                            fontSize: '0.75rem'
                                        }}>
                                            {movie.genre} · {movie.year}
                                        </Typography>

                                        {/* Buttons */}
                                        <Box sx={{ 
                                            display: 'flex', 
                                            gap: 1, 
                                            mt: 1, 
                                            alignItems: 'center',
                                            '& .MuiButton-root': {
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                fontWeight: 'bold',
                                                boxShadow: 'none'
                                            }
                                        }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                href={movie.platformUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ flex: 1 }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Watch
                                            </Button>
                                            <Button
                                                component={Link}
                                                to={`/rate/${movie._id}`}
                                                variant="outlined"
                                                color="secondary"
                                                size="small"
                                                startIcon={<StarIcon />}
                                                sx={{ flex: 1 }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Rate
                                            </Button>
                                            <Tooltip title={watchlist?.some((m) => m._id === movie._id) ? "Remove from Watchlist" : "Add to Watchlist"}>
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleWatchlist(movie);
                                                    }}
                                                    color="primary"
                                                    disabled={toggling === movie._id}
                                                    sx={{
                                                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    {toggling === movie._id ? (
                                                        <CircularProgress size={20} />
                                                    ) : watchlist?.some((m) => m._id === movie._id) ? (
                                                        <BookmarkIcon />
                                                    ) : (
                                                        <BookmarkBorderIcon />
                                                    )}
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            ) : null}

            {/* Movie Details Popup */}
            {selectedMovie && (
                <Dialog open={true} onClose={handleClosePopup} maxWidth="sm" fullWidth>
                    <DialogTitle textAlign="center">{selectedMovie.title}</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img 
                                src={selectedMovie.imageUrl} 
                                alt={selectedMovie.title} 
                                style={{
                                    width: '60%',
                                    maxHeight: '280px',
                                    objectFit: 'contain',
                                    borderRadius: '10px',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)'
                                }}
                            />
                        </Box>

                        <Typography variant="h6" sx={{ mt: 2 }}>
                            {selectedMovie.genre} · {selectedMovie.year}
                        </Typography>

                        <Typography variant="body1" sx={{ mt: 1, px: 3, opacity: 0.8 }}>
                            {selectedMovie.description}
                        </Typography>

                        {/* Ratings Section - Added Platform Rating */}
                        <Box display="flex" alignItems="center" justifyContent="center" sx={{ gap: 3, mt: 2 }}>
                            <Box display="flex" alignItems="center">
                                <StarIcon sx={{ fontSize: 24, color: '#f5c518' }} />
                                <Typography variant="h6" sx={{ ml: 1 }}>
                                    {selectedMovie.imdbRating ? selectedMovie.imdbRating.toFixed(1) : 'N/A'}
                                </Typography>
                                <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                                    (IMDb)
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <StarIcon sx={{ fontSize: 24, color: '#3f51b5' }} />
                                <Typography variant="h6" sx={{ ml: 1 }}>
                                    {selectedMovie.averageRating ? selectedMovie.averageRating.toFixed(1) : 'N/A'}
                                </Typography>
                                <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                                    (Platform)
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                <strong>Director:</strong> {selectedMovie.director || 'N/A'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                                <strong>Cast:</strong> {selectedMovie.cast?.join(', ') || 'N/A'}
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            href={selectedMovie.platformUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ mt: 3, mb: 1 }}
                        >
                            Watch on {selectedMovie.platformUrl.includes('netflix') ? 'Netflix' : 'Platform'}
                        </Button>

                        <Button
                            component={Link}
                            to={`/rate/${selectedMovie._id}`}
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            startIcon={<StarIcon />}
                            sx={{ mb: 2 }}
                        >
                            Rate this Movie
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </Container>
    );
};

export default Recommendations;

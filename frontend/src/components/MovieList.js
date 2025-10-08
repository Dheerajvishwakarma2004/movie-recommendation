import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies, toggleWatchlist, getWatchlist } from '../api'; // Add getWatchlist
import { 
    Container, Typography, Card, CardMedia, CardContent, Button, Box, Dialog, 
    DialogTitle, DialogContent, DialogActions, IconButton, Divider, CircularProgress, Tooltip
} from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [toggling, setToggling] = useState(null);

    // Fetch movies and watchlist on component mount
    useEffect(() => {
        const fetchMoviesData = async () => {
            try {
                const data = await fetchMovies();
                setMovies(data);
            } catch (error) {
                setMessage('Failed to fetch movies. Please try again later.');
            }
        };

        const fetchWatchlistData = async () => {
            try {
                const watchlistData = await getWatchlist(); // Fetch watchlist from API
                setWatchlist(watchlistData); // Initialize watchlist state
            } catch (error) {
                setMessage('Failed to fetch watchlist. Please try again later.');
            }
        };

        fetchMoviesData();
        fetchWatchlistData();
    }, []);

    const handleOpenDialog = (movie) => setSelectedMovie(movie);
    const handleCloseDialog = () => setSelectedMovie(null);

    const handleToggleWatchlist = async (movie) => {
        setToggling(movie._id); // Show loading spinner
        try {
            // Step 1: Toggle the watchlist status for the movie
            await toggleWatchlist(movie._id);
    
            // Step 2: Refetch the updated watchlist from the API
            const updatedWatchlist = await getWatchlist();
    
            // Step 3: Update the watchlist state with the new data
            setWatchlist(updatedWatchlist);
        } catch (error) {
            setMessage('Failed to update watchlist. Please try again.');
        } finally {
            setToggling(null); // Hide loading spinner
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                Movie List
            </Typography>

            {message && (
                <Typography color="error" role="alert">
                    {message}
                </Typography>
            )}

            {movies.length === 0 && !message && (
                <Typography color="textSecondary">No movies available.</Typography>
            )}

            {movies.length > 0 && (
                <Carousel
                    responsive={responsive}
                    infinite
                    autoPlay={false}
                    autoPlaySpeed={3000}
                    arrows
                    swipeable
                    draggable={false}
                >
                    {movies.map((movie) => (
                        <Card
                            key={movie._id}
                            elevation={3}
                            sx={{
                                height: '100%',
                                width: '90%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 2,
                                overflow: 'hidden',
                                m: 1,
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="300"
                                image={movie.imageUrl}
                                alt={movie.title}
                                sx={{ objectFit: 'cover', width: '100%' }}
                                loading="lazy"
                            />

                        <CardContent
                            sx={{
                                flexGrow: 1,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)',
                                borderTop: '1px solid rgba(0,0,0,0.1)'
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
                                >
                                    Rate
                                </Button>
                                <IconButton 
                                    color="info" 
                                    onClick={() => handleOpenDialog(movie)}
                                    sx={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.1)'
                                        }
                                    }}
                                >
                                    <InfoIcon />
                                </IconButton>
                                <Tooltip title={watchlist.some((m) => m._id === movie._id) ? "Remove from Watchlist" : "Add to Watchlist"}>
                                    <IconButton
                                        onClick={() => handleToggleWatchlist(movie)}
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
                                        ) : watchlist.some((m) => m._id === movie._id) ? (
                                            <BookmarkIcon />
                                        ) : (
                                            <BookmarkBorderIcon />
                                        )}
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </CardContent>
                        </Card>
                    ))}
                </Carousel>
            )}

            {selectedMovie && (
                <Dialog
                    open={!!selectedMovie}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                    scroll="paper" // Enable scrolling
                    sx={{
                        '& .MuiPaper-root': {
                            borderRadius: '12px',
                            background: '#1e1e1e', // Matching your card background
                            color: '#ffffff',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            maxHeight: 'calc(100vh - 64px)' // Ensure it doesn't exceed viewport
                        },
                        '& .MuiDialogContent-root': {
                            overflowY: 'auto', // Enable scrolling for content
                            padding: '16px 24px',
                            '&::-webkit-scrollbar': {
                                width: '6px'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                borderRadius: '3px'
                            }
                        }
                    }}
                >
                    <DialogTitle sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '16px 24px',
                        background: 'rgba(30, 30, 30, 0.9)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1
                    }}>
                        <Typography variant="h5" sx={{ 
                            fontWeight: 'bold',
                            color: '#ffffff'
                        }}>
                            {selectedMovie.title}
                        </Typography>
                        <IconButton 
                            onClick={handleCloseDialog} 
                            sx={{ 
                                color: 'rgba(255, 255, 255, 0.7)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    
                    <DialogContent>
                        <Box sx={{ 
                            width: '100%', 
                            display: 'flex', 
                            justifyContent: 'center',
                            margin: '16px 0'
                        }}>
                            <img 
                                src={selectedMovie.imageUrl} 
                                alt={selectedMovie.title} 
                                style={{
                                    width: '60%',
                                    maxHeight: '350px',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                                }}
                            />
                        </Box>

                        <Typography variant="subtitle1" sx={{ 
                            color: '#bbbbbb',
                            textAlign: 'center',
                            mb: 2
                        }}>
                            {selectedMovie.genre} · {selectedMovie.year}
                        </Typography>

                        <Typography variant="body1" sx={{ 
                            color: '#e0e0e0',
                            lineHeight: 1.6,
                            mb: 3,
                            textAlign: 'center'
                        }}>
                            {selectedMovie.description}
                        </Typography>

                        <Divider sx={{ 
                            my: 2, 
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }} />

                        <Box display="flex" alignItems="center" justifyContent="center" sx={{ gap: 3, my: 2 }}>
                            <Tooltip title="IMDb Rating">
                                <Box display="flex" alignItems="center" sx={{
                                    backgroundColor: 'rgba(245, 197, 24, 0.1)',
                                    px: 2,
                                    py: 1,
                                    borderRadius: '6px'
                                }}>
                                    <StarIcon sx={{ fontSize: 22, color: '#f5c518' }} />
                                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                                        {selectedMovie.imdbRating ? selectedMovie.imdbRating.toFixed(1) : 'N/A'}
                                    </Typography>
                                </Box>
                            </Tooltip>
                            <Tooltip title="Platform Rating">
                                <Box display="flex" alignItems="center" sx={{
                                    backgroundColor: 'rgba(63, 81, 181, 0.1)',
                                    px: 2,
                                    py: 1,
                                    borderRadius: '6px'
                                }}>
                                    <StarIcon sx={{ fontSize: 22, color: '#7986cb' }} />
                                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                                        {selectedMovie.averageRating ? selectedMovie.averageRating.toFixed(1) : 'N/A'}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        </Box>

                        <Box sx={{ textAlign: 'center', my: 2 }}>
                            <Typography variant="body2" sx={{ 
                                color: '#aaaaaa',
                                '& strong': {
                                    color: '#ffffff',
                                    fontWeight: 'medium'
                                }
                            }}>
                                <strong>Director:</strong> {selectedMovie.director || 'N/A'}
                            </Typography>
                            <Typography variant="body2" sx={{ 
                                color: '#aaaaaa',
                                mt: 1,
                                '& strong': {
                                    color: '#ffffff',
                                    fontWeight: 'medium'
                                }
                            }}>
                                <strong>Cast:</strong> {selectedMovie.cast?.join(', ') || 'N/A'}
                            </Typography>
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ 
                        justifyContent: 'center', 
                        padding: '16px 24px',
                        background: 'rgba(30, 30, 30, 0.9)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        position: 'sticky',
                        bottom: 0
                    }}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            href={selectedMovie.platformUrl} 
                            target="_blank"
                            sx={{
                                minWidth: '120px',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                                py: 1,
                                textTransform: 'none',
                                backgroundColor: '#3f51b5',
                                '&:hover': {
                                    backgroundColor: '#3949ab'
                                }
                            }}
                        >
                            Watch Now
                        </Button>
                        <Button 
                            component={Link} 
                            to={`/rate/${selectedMovie._id}`} 
                            variant="outlined" 
                            color="secondary"
                            sx={{
                                minWidth: '120px',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                                py: 1,
                                textTransform: 'none',
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                color: '#ffffff',
                                '&:hover': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)'
                                }
                            }}
                        >
                            Rate
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
};

export default MovieList;
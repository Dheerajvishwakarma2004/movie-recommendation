import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrendingMovies, getWatchlist, toggleWatchlist } from '../api';
import { 
    Container, Typography, Card, CardMedia, CardContent, Button, Box, IconButton, Tooltip, Dialog, DialogTitle, DialogContent 
} from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Recommendations from './Recommendations';

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const Homepage = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [watchlist, setWatchlist] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const trendingData = await fetchTrendingMovies();
                setTrendingMovies(trendingData);

                const token = localStorage.getItem('token');
                if (token) {
                    setIsLoggedIn(true);
                    try {
                        const watchlistData = await getWatchlist();
                        setWatchlist(watchlistData);
                    } catch (error) {
                        console.warn('Failed to fetch watchlist:', error);
                        setWatchlist([]);
                    }
                }
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            }
        };
        fetchMovies();
    }, []);

    const handleOpenPopup = (movie) => {
        setSelectedMovie(movie);
    };

    const handleClosePopup = () => {
        setSelectedMovie(null);
    };

    const handleToggleWatchlist = async (movieId, e) => {
        e.stopPropagation();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                // Handle case when user is not logged in
                return;
            }

            // Call the toggleWatchlist API function
            await toggleWatchlist(movieId);
            
            // Refresh the watchlist after toggling
            const updatedWatchlist = await getWatchlist();
            setWatchlist(updatedWatchlist);
        } catch (error) {
            console.error('Error updating watchlist:', error);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            {/* Welcome Section */}
            <Box sx={{
                textAlign: 'center',
                padding: '6rem 2rem',
                background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(220, 0, 78, 0.1) 100%)',
                borderRadius: 3,
                marginTop: 2,
                border: '1px solid rgba(100, 181, 246, 0.3)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 300,
                    height: 300,
                    background: 'radial-gradient(circle, rgba(25, 118, 210, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                }} />
                <Typography variant="h1" gutterBottom sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    mb: 2,
                    position: 'relative',
                    zIndex: 1,
                }}>
                    Welcome to MovieDB
                </Typography>
                <Typography variant="h5" gutterBottom sx={{
                    color: '#b0b9c3',
                    mb: 3,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    position: 'relative',
                    zIndex: 1,
                }}>
                    Discover the best movies and TV shows tailored just for you.
                </Typography>
                <Button
                    component={Link}
                    to="/movies"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        px: 4,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                        boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                        '&:hover': {
                            boxShadow: '0 12px 32px rgba(25, 118, 210, 0.4)',
                            transform: 'translateY(-2px)',
                        },
                    }}
                >
                    Explore Movies
                </Button>
            </Box>

            {/* Trending Movies Section */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mt: 4,
                mb: 2,
            }}>
                <Typography variant="h4" sx={{
                    fontWeight: 700,
                    color: '#ffffff',
                }}>
                    Trending Movies
                </Typography>
                {trendingMovies.length > 0 && (
                    <Typography sx={{
                        backgroundColor: 'rgba(100, 181, 246, 0.2)',
                        color: '#64b5f6',
                        padding: '0.5rem 1rem',
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '0.9rem',
                    }}>
                        {trendingMovies.length} trending
                    </Typography>
                )}
            </Box>
            {trendingMovies.length > 0 ? (
                <Carousel
                    responsive={responsive}
                    infinite
                    autoPlay={false}
                    arrows
                    swipeable
                    draggable={false}
                >
                    {trendingMovies.map((movie) => (
                        <Card
                            key={movie._id}
                            elevation={0}
                            sx={{
                                height: '100%',
                                width: '90%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 2,
                                overflow: 'hidden',
                                m: 1,
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
                            <Box sx={{ position: 'relative', overflow: 'hidden', height: 300 }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={movie.imageUrl}
                                    alt={movie.title}
                                    sx={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        transition: 'transform 0.3s ease-in-out',
                                    }}
                                    loading="lazy"
                                />
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease-in-out',
                                }} />
                            </Box>

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
                                        sx={{ flex: 1 }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Rate
                                    </Button>
                                    <Tooltip title={watchlist?.some((m) => m._id === movie._id) ? "Remove from Watchlist" : "Add to Watchlist"}>
                                        <IconButton
                                            onClick={(e) => handleToggleWatchlist(movie._id, e)}
                                            color="primary"
                                            sx={{
                                                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.1)'
                                                }
                                            }}
                                        >
                                            {watchlist?.some((m) => m._id === movie._id) ? (
                                                <BookmarkIcon />
                                            ) : (
                                                <BookmarkBorderIcon />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                    <IconButton 
                                        color="info" 
                                        sx={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)'
                                            }
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenPopup(movie);
                                        }}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Carousel>
            ) : (
                <Typography color="textSecondary">No trending movies available.</Typography>
            )}

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

            {/* Recommended for You Section (Visible Only When Logged In) */}
            {isLoggedIn && (
                <>
                    <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                        Recommended for You
                    </Typography>
                    <Recommendations mode="watchlist" watchlist={watchlist} />
                </>
            )}
        </Container>
    );
};

export default Homepage;

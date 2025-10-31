import React from 'react';
import { Box, Typography, Link, Container, Divider } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #0a0e27 0%, #050815 100%)',
                padding: '4rem 2rem 2rem',
                marginTop: '6rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                        gap: 4,
                        mb: 4,
                    }}
                >
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <MovieIcon sx={{ fontSize: 28, color: '#64b5f6' }} />
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#ffffff' }}>
                                MovieDB
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#8a92a0', lineHeight: 1.8 }}>
                            Discover the best movies and TV shows tailored just for you.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#ffffff', mb: 2 }}>
                            Explore
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="/" sx={{
                                color: '#b0b9c3',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: '#64b5f6',
                                    transform: 'translateX(4px)',
                                }
                            }}>
                                Home
                            </Link>
                            <Link href="/movies" sx={{
                                color: '#b0b9c3',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: '#64b5f6',
                                    transform: 'translateX(4px)',
                                }
                            }}>
                                Movies
                            </Link>
                            <Link href="/recommendations" sx={{
                                color: '#b0b9c3',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: '#64b5f6',
                                    transform: 'translateX(4px)',
                                }
                            }}>
                                Recommendations
                            </Link>
                            <Link href="/watchlist" sx={{
                                color: '#b0b9c3',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: '#64b5f6',
                                    transform: 'translateX(4px)',
                                }
                            }}>
                                Watchlist
                            </Link>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#ffffff', mb: 2 }}>
                            Legal
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="#" sx={{
                                color: '#b0b9c3',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: '#64b5f6',
                                    transform: 'translateX(4px)',
                                }
                            }}>
                                Privacy Policy
                            </Link>
                            <Link href="#" sx={{
                                color: '#b0b9c3',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: '#64b5f6',
                                    transform: 'translateX(4px)',
                                }
                            }}>
                                Terms of Service
                            </Link>
                            <Link href="#" sx={{
                                color: '#b0b9c3',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: '#64b5f6',
                                    transform: 'translateX(4px)',
                                }
                            }}>
                                Contact Us
                            </Link>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#ffffff', mb: 2 }}>
                            Follow Us
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Link href="#" sx={{
                                color: '#b0b9c3',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: '#64b5f6',
                                    transform: 'translateY(-3px)',
                                }
                            }}>
                                <FacebookIcon />
                            </Link>
                            <Link href="#" sx={{
                                color: '#b0b9c3',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: '#64b5f6',
                                    transform: 'translateY(-3px)',
                                }
                            }}>
                                <TwitterIcon />
                            </Link>
                            <Link href="#" sx={{
                                color: '#b0b9c3',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: '#64b5f6',
                                    transform: 'translateY(-3px)',
                                }
                            }}>
                                <InstagramIcon />
                            </Link>
                            <Link href="#" sx={{
                                color: '#b0b9c3',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: '#64b5f6',
                                    transform: 'translateY(-3px)',
                                }
                            }}>
                                <LinkedInIcon />
                            </Link>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 3 }} />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    <Typography variant="body2" sx={{ color: '#8a92a0' }}>
                        © {currentYear} MovieDB. All rights reserved.
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#8a92a0' }}>
                        Built with ❤️ for movie enthusiasts
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import MovieList from './components/MovieList';
import MovieRating from './components/MovieRating';
import WatchList from './components/WatchList';
import Recommendations from './components/Recommendations';
import Auth from './components/Auth';
import Footer from './components/Footer';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
            light: '#64b5f6',
            dark: '#1565c0',
        },
        secondary: {
            main: '#dc004e',
            light: '#ff4081',
            dark: '#a00037',
        },
        background: {
            default: '#0a0e27',
            paper: '#1a1f3a',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b9c3',
        },
        divider: 'rgba(255, 255, 255, 0.1)',
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '3rem',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg, #64b5f6 0%, #ff4081 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#ffffff',
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 700,
            color: '#ffffff',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#ffffff',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#ffffff',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            color: '#ffffff',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(135deg, #1565c0 0%, #1a237e 100%)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(10px)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    transition: 'all 0.3s ease-in-out',
                },
                contained: {
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                        boxShadow: '0 6px 20px rgba(25, 118, 210, 0.5)',
                        transform: 'translateY(-2px)',
                    },
                },
                outlined: {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                        borderColor: '#64b5f6',
                        backgroundColor: 'rgba(100, 181, 246, 0.1)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(135deg, #1a1f3a 0%, #232d4d 100%)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        borderColor: 'rgba(100, 181, 246, 0.5)',
                        boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'linear-gradient(135deg, #1a1f3a 0%, #232d4d 100%)',
                    borderRadius: '12px',
                },
                elevation1: {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                },
                elevation3: {
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                },
                elevation6: {
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundImage: 'linear-gradient(135deg, #1a1f3a 0%, #232d4d 100%)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover fieldset': {
                            borderColor: '#64b5f6',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1976d2',
                        },
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        backgroundColor: 'rgba(100, 181, 246, 0.1)',
                        transform: 'scale(1.1)',
                    },
                },
            },
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

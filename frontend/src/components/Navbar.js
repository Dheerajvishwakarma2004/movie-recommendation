import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MovieIcon from "@mui/icons-material/Movie";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <AppBar position="sticky" elevation={0} sx={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
        }}>
            <Toolbar sx={{ py: 1.5, px: { xs: 2, md: 4 } }}>
                <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 1, color: "inherit", marginRight: "auto" }}>
                    <MovieIcon sx={{ fontSize: 32, color: '#64b5f6' }} />
                    <Typography variant="h5" sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #64b5f6 0%, #ff4081 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '0.5px',
                    }}>
                        MovieDB
                    </Typography>
                </Link>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                        component={Link}
                        to="/"
                        color="inherit"
                        sx={{
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 500,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: 0,
                                height: '2px',
                                background: 'linear-gradient(135deg, #64b5f6 0%, #ff4081 100%)',
                                transition: 'width 0.3s ease-in-out',
                            },
                            '&:hover::after': {
                                width: '100%',
                            },
                        }}
                    >
                        Home
                    </Button>

                    <Button
                        component={Link}
                        to="/movies"
                        color="inherit"
                        sx={{
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 500,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: 0,
                                height: '2px',
                                background: 'linear-gradient(135deg, #64b5f6 0%, #ff4081 100%)',
                                transition: 'width 0.3s ease-in-out',
                            },
                            '&:hover::after': {
                                width: '100%',
                            },
                        }}
                    >
                        Movies
                    </Button>

                    {isAuthenticated && (
                        <>
                            <Button
                                component={Link}
                                to="/recommendations"
                                color="inherit"
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: 0,
                                        height: '2px',
                                        background: 'linear-gradient(135deg, #64b5f6 0%, #ff4081 100%)',
                                        transition: 'width 0.3s ease-in-out',
                                    },
                                    '&:hover::after': {
                                        width: '100%',
                                    },
                                }}
                            >
                                Recommendations
                            </Button>

                            <Button
                                component={Link}
                                to="/watchlist"
                                color="inherit"
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: 0,
                                        height: '2px',
                                        background: 'linear-gradient(135deg, #64b5f6 0%, #ff4081 100%)',
                                        transition: 'width 0.3s ease-in-out',
                                    },
                                    '&:hover::after': {
                                        width: '100%',
                                    },
                                }}
                            >
                                Watchlist
                            </Button>
                        </>
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            borderRadius: '8px',
                            padding: "6px 12px",
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                backgroundColor: "rgba(255, 255, 255, 0.12)",
                                borderColor: 'rgba(100, 181, 246, 0.3)',
                            },
                            '&:focus-within': {
                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                                borderColor: '#64b5f6',
                            },
                            gap: 1,
                        }}
                    >
                        <SearchIcon sx={{ fontSize: 20, color: '#b0b9c3' }} />
                        <InputBase
                            placeholder="Search movies..."
                            sx={{
                                color: "inherit",
                                fontSize: '0.9rem',
                                '& input::placeholder': {
                                    opacity: 0.7,
                                    color: '#8a92a0',
                                },
                                width: { xs: 120, sm: 150, md: 200 },
                            }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Box>

                    {isAuthenticated ? (
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            sx={{
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 500,
                                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                border: '1px solid rgba(244, 67, 54, 0.3)',
                                '&:hover': {
                                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                                    borderColor: 'rgba(244, 67, 54, 0.5)',
                                },
                            }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            component={Link}
                            to="/auth"
                            variant="contained"
                            sx={{
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

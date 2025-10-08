import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token); // Convert token to boolean
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    MovieDB
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <Button color="inherit">Home</Button>
                    </Link>
                    <Link to="/movies" style={{ textDecoration: "none", color: "inherit" }}>
                        <Button color="inherit">Movies</Button>
                    </Link>
                    
                    {/* Show only when logged in */}
                    {isAuthenticated && (
                        <>
                            <Link to="/recommendations" style={{ textDecoration: "none", color: "inherit" }}>
                                <Button color="inherit">Recommendations</Button>
                            </Link>
                            <Link to="/watchlist" style={{ textDecoration: "none", color: "inherit" }}>
                                <Button color="inherit">Watchlist</Button>
                            </Link>
                        </>
                    )}

                    {/* Search Bar */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            borderRadius: 1,
                            padding: "0 8px",
                        }}
                    >
                        <SearchIcon />
                        <InputBase
                            placeholder="Search movies..."
                            sx={{ color: "inherit", marginLeft: 1 }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Box>

                    {/* Authentication Buttons */}
                    {isAuthenticated ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Link to="/auth" style={{ textDecoration: "none", color: "inherit" }}>
                            <Button color="inherit">Sign In</Button>
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

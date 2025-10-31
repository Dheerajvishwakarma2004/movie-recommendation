import React from "react";
import { Card, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const MovieCard = ({ movie, onAddToWatchlist }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="300"
                image={movie.imageUrl}
                alt={movie.title}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {movie.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {movie.genre} · {movie.year}
                </Typography>
                <IconButton color="primary" onClick={() => onAddToWatchlist(movie)}>
                    <FavoriteIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default MovieCard;

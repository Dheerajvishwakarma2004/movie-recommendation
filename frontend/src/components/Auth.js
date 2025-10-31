import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../api';
import { TextField, Button, Typography, Container, Paper, Link, Box, Divider, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { username, password };
            if (isLogin) {
                const data = await loginUser(userData);
                localStorage.setItem('token', data.token);
                setMessage('Login successful!');
                navigate('/');
                window.location.reload();
            } else {
                await registerUser(userData);
                setMessage('Registration successful! Please log in.');
                setIsLogin(true);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
            <Paper elevation={0} sx={{
                padding: 4,
                width: '100%',
                maxWidth: 450,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #1a1f3a 0%, #232d4d 100%)',
                border: '1px solid rgba(100, 181, 246, 0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
            }}>
                <Box textAlign="center" mb={3}>
                    <Typography variant="h4" component="h1" sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #64b5f6 0%, #ff4081 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#b0b9c3', mt: 1 }}>
                        {isLogin ? 'Sign in to continue' : 'Get started with your account'}
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                        InputProps={{
                            style: { borderRadius: 8 }
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                        InputProps={{
                            style: { borderRadius: 8 },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ 
                            mt: 2, 
                            mb: 2,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 600
                        }}
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </Button>
                </form>

                <Divider sx={{ my: 3 }}>or</Divider>

                <Box textAlign="center" mt={2}>
                    <Typography variant="body2" sx={{ display: 'inline' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </Typography>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setMessage('');
                        }}
                        sx={{ 
                            fontWeight: 600,
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </Link>
                </Box>

                {message && (
                    <Typography 
                        variant="body2" 
                        color={message.includes('successful') ? 'success.main' : 'error.main'} 
                        align="center" 
                        sx={{ 
                            mt: 2,
                            p: 1.5,
                            borderRadius: 1,
                            backgroundColor: message.includes('successful') ? 'success.light' : 'error.light'
                        }}
                    >
                        {message}
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};

export default Auth;

import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                padding: '2rem 0',
                marginTop: '4rem',
                borderTop: '1px solid #e0e0e0',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <Typography variant="body2" color="textSecondary">
                        © {new Date().getFullYear()} MovieDB. All rights reserved.
                    </Typography>
                    <Box>
                        <Link href="#" color="textSecondary" sx={{ marginRight: 2 }}>
                            Privacy Policy
                        </Link>
                        <Link href="#" color="textSecondary" sx={{ marginRight: 2 }}>
                            Terms of Service
                        </Link>
                        <Link href="#" color="textSecondary">
                            Contact Us
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
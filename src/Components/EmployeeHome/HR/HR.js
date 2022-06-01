import { Box, Container } from '@mui/material';
import React from 'react';
import MobileNav from '../MobileNav';
import NotAuthorized from '../NotAuthorized';
import OuterBar from '../OuterBar';

const HR = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    if(!user?.result?.name || user?.result?.securityLevel != 'System Administrator' && 'HR') {
        return (
            <NotAuthorized />
        )
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <OuterBar />
            <Container maxWidth="2xl" sx={{ mt: 10, mb: 4, display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'flex-start', flexDirection: 'column'   }} >
                HR Dashboard
            </Container>
            <MobileNav />
        </Box>
    )
}

export default HR
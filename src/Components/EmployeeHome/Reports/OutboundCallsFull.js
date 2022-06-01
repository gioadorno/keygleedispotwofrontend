import { Container, Toolbar, Paper, Typography } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReports } from '../../../actions/closereports';
import Login from '../../Login/Login';
import MobileNav from '../MobileNav';
import OuterBar from '../OuterBar';
import OutboundCalls from './OutboundCalls';

const mdTheme = createTheme();

const OutboundCallsFull = () => {
  const user = JSON.parse(localStorage.getItem('profile')); 
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getReports())
    },[])
    const {callReports} = useSelector((state) => state?.reports);
    // const dataTotal = useSelector((state) => state?.reports?.aggregations);
    // const total = dataTotal?.filter((data) => data.aggregations.totals)


    if(!user?.result?.name || user?.result?.accountLevel != 'Employee') {
      return (
          <Login />
      )
  };
  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>
        <OuterBar />
        <Container maxWidth="2xl" sx={{ mt: 10, mb: 4, display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'flex-start', flexDirection: 'column'  }} >
            <Toolbar>
                <Typography variant='h3' component = 'h4'>
                    Calls/Texts
                </Typography>
            </Toolbar>
            <Paper style={{ width: '95%', height: '75%' }} elevation={16}>
                <OutboundCalls callReports={callReports} />
            </Paper>
        </Container>
        <MobileNav />
    </Box>
</ThemeProvider>
  )
}

export default OutboundCallsFull
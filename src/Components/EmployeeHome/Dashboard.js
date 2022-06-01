import { styled, createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CssBaseline } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems, systemListItems } from './listItems';
import AccountMenu from './AccountMenu';
import OuterBar from './OuterBar';
import { getReports } from '../../actions/closereports';
import Login from '../Login/Login';
import OutboundCalls from './Reports/OutboundCalls';
import MobileNav from './MobileNav';
import Events from './EventCalendar/Events';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
  
  const drawerWidth = 240;


  
  const mdTheme = createTheme();
  
  function DashboardContent() {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getReports())
    },[])
    const {callReports} = useSelector((state) => state?.reports);
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };

    if(!user?.result?.name || user?.result?.accountLevel != 'Employee') {
      return (
          <Login />
      )
  };

  
    return (
        <Box sx={{ display: 'flex', height: '100%', bgcolor: '#003558' }}>
          <CssBaseline />
            <OuterBar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Typography variant='h4' component='h4' sx={{ textAlign: 'center', m: 2 }}>Employee Dashboard</Typography>
            <Toolbar />
            <Container maxWidth="2xl" sx={{ mt: 4, mb: 4, }}>
              <Grid container spacing={3}>
                {/* Announcements */}
                <Grid item xs={12} xl={8}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 600,
                    }}
                  >
                    <Typography sx={{ mb: 3, textAlign: 'center' }} variant='h4' component='h4'>
                      Calls/Texts
                    </Typography>
                    <OutboundCalls callReports={callReports}/>
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} xl={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 600,
                    }}
                  >
                    <Events />
                  </Paper>
                  
                </Grid>
                {/* Recent Orders */}
              </Grid>
              {/* <Copyright sx={{ pt: 4 }} /> */}
            </Container>
          </Box>
          <MobileNav />
        </Box>
    );
  }
  
  export default function Dashboard() {
    return <DashboardContent />;
  }
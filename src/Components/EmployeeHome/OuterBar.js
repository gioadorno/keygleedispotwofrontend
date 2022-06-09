import { styled, createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core';
import CssBaseline from '@mui/material/CssBaseline';
import { AvatarGroup, Tooltip } from '@mui/material';
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
import { mainListItems, secondaryListItems, shortcutItems, systemListItems, hrListItems, onboardingListItems } from './listItems';
import AccountMenu from './AccountMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateEmployee } from '../../actions/employees';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
  
  const drawerWidth = 220;
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    backgroundColor: '#44a1c9',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      backgroundColor: '#44a1c9',
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );
  
  const mdTheme = createTheme();
  
  function DashboardContent() {
    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getUsers())
    },[])
    const { employees } = useSelector((state) => state.employees);
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const [ status, setStatus ] = useState({ status: 'Active' })
    const setActive = () => {
      dispatch(updateEmployee(user.result._id, status))
    }


    return (
      <StylesProvider injectFirst>
        <ThemeProvider theme={mdTheme}>
          <AppBar onLoad={setActive} sx={{ display: { xs: 'none', sm:'inline-flex' }, backgroundColor: '#44a1c9 !important'}} position="absolute" open={open}>
            <Toolbar sx={{
                pr: '24px',
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography sx={{ display: {xs: 'none', sm: 'block'}, mr: 1}} variant='body2'>
                  Users Online:
                </Typography>
                <AvatarGroup sx={{ mr: -15, display: { xs: 'none', sm: 'inherit' }, p: 1}} max={5}>
                  {employees.map((employee) => 
                  employee.status === 'Active' &&
                  <Tooltip title={employee.name}>
                    <Avatar key={employee._id} sx={{ width: 35, height: 35 }} alt={employee.name} src={employee.profilePhoto} />

                  </Tooltip>
                  )}
                </AvatarGroup>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, textAlign: 'center', }}
              >
                KeygleeDispo Dashboard
              </Typography>

              <AccountMenu />
            </Toolbar>
          </AppBar>
          <Drawer sx={{ display: { xs: 'none', sm: 'inline-flex' }, }} variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List sx={{ overflow: 'hidden' }} component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {secondaryListItems}
              <Divider sx={{ my: 1 }} />
              {onboardingListItems}
              {user.result.securityLevel === 'HR' && (
                <>
              <Divider sx={{ my: 1 }} />
                {systemListItems}
                </>
              )}
              {user.result.securityLevel === 'System Administrator' && (
                <>
              <Divider sx={{ my: 1 }} />
                {systemListItems}
                </>
              )}
              {user.result.securityLevel === 'HR' && (
                <>
                <Divider sx={{ my: 1 }} />
                {hrListItems}
                </>
              )}
              {user.result.securityLevel === 'System Administrator' && (
                <>
                <Divider sx={{ my: 1 }} />
                {hrListItems}
                </>
              )}
              <Divider sx={{ my: 1 }} />
                {shortcutItems}
            </List>
          </Drawer>
        </ThemeProvider>
        </StylesProvider>
    )

};

export default DashboardContent
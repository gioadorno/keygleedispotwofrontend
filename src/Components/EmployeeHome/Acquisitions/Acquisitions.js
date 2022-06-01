import { createTheme, ThemeProvider} from '@mui/material/styles';
import OuterBar from '../OuterBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Button, ButtonGroup, Divider, FormControl, FormHelperText, InputLabel, Menu, MenuItem, Select, Slide, Snackbar, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AodIcon from '@mui/icons-material/Aod';
import ArticleIcon from '@mui/icons-material/Article';
import { useSelector, useDispatch } from "react-redux";
import { useState, Fragment } from "react";
import { getPropsBySearch } from '../../../actions/properties';
import Paginate from './Pagination';
import { useLocation, useNavigate } from "react-router-dom";
import useStyles from './styles';
import Properties from './Properties';
import Login from '../../Login/Login';
import MobileNav from '../MobileNav';
import CloseIcon from '@mui/icons-material/Close';

const mdTheme = createTheme();

function useQuery() {
    return new URLSearchParams(useLocation().search)
}


const Acquisitions = (anchor) => {
    const [ open, setOpen ] = useState(false);
        // Get logged in user info
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const containerRef = useState(null);

    const actions = [
        { icon: <FileCopyIcon onClick={() => navigate('/acqpaperwork')} />, name: 'Acq Paperwork'},
        { icon: <ArticleIcon onClick={() => navigate('/acqoptions')} />, name: 'Acq Options' },
        { icon: <AodIcon onClick={() => navigate('/dispopaperwork')} />, name: 'Dispo Paperwork' },
      ];

    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const dispatch = useDispatch();
    // Receiving properties from Database

    const classes = useStyles();

    const {props} = useSelector((state) => state.posts)

    const [ openFilter, setOpenFilter ] = useState(false);
    const [ filter, setFilter ] = useState([]);

    const searchProperty = () => {
        if(filter) {
            dispatch(getPropsBySearch({ tags: filter.join(',') })); //search = usestate variable [arizona, alabamba] => (arizona,alabamba)
            navigate(`/acquisitions/search?searchQuery=&tags=${filter.join(',')}`);
            setOpenFilter(false);
        } else {
            navigate('/acquisitions');
        }
    };

        // SnackBar
    
        const closeSnackBar = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
        
            setOpen(false);
        };
    
        const deleteAction = (
        <Fragment>
            <Button color="error" size="large" onClick={closeSnackBar}>
            Close
            </Button>
            <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeSnackBar}
            >
            <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
        );


    if(!user?.result?.name || user?.result?.accountLevel != 'Employee') {
        return (
            <Login />
        )
    };

            // Removes Duplicates of Supplier Names
            const acqNames = props.filter((value, index, self) => 
            index === self.findIndex((t) => (
                t.name === value.name
            ))
            );

            const dispoNames = props.filter((value, index, self) => 
            index === self.findIndex((t) => 
            t.dispoName === value.dispoName));

            const statusList = props.filter((value, index, self) =>
            index === self.findIndex((t) =>
            t.status === value.status));

            const auditList = props.filter((value, index, self) =>
            index === self.findIndex((t) =>
            t.audited === value.audited));

  return (
    <ThemeProvider theme={mdTheme}>
        <Box ref={containerRef} sx={{ display: 'flex', width: '100%', position: 'relative', overflowx: 'hidden' }}>
        <Slide style={{ padding: 0, height: '10em' }} direction='down' in={openFilter} container={containerRef.current}>
                    <Box sx={{ height: '10em', boxShadow: 4, display: { sm: 'flex' }, alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1300, bgcolor: 'white', px: 5, width: '100%' }}>
                        <FormControl sx={{ ml: 5 }}>
                            <InputLabel>Acq</InputLabel>
                            <Select>
                                <MenuItem value=''> </MenuItem>
                                {acqNames.map((prop) => (
                                    <MenuItem onClick={() => {setFilter(array => [...array, `Acq: ${prop.name}`])}} value={prop.name}>{prop.name}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                                Filter by Acquisitions
                            </FormHelperText>
                        </FormControl>
                        <Divider sx={{ mx: 3 }} orientation='vertical' />
                        <FormControl>
                            <InputLabel>Dispo</InputLabel>
                            <Select>
                                <MenuItem value=''> </MenuItem>
                                {dispoNames.map((prop) => (
                                    <MenuItem onClick={() => {setFilter(array => [...array, `Dispo: ${prop.dispoName}`])}} value={prop.dispoName}>{prop.dispoName}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                                Filter by Dispositions
                            </FormHelperText>
                        </FormControl>
                        <Divider sx={{ mx: 3 }} orientation='vertical' />
                        <FormControl>
                            <InputLabel>Status</InputLabel>
                            <Select>
                                <MenuItem value=''> </MenuItem>
                                {statusList.map((prop) => (
                                    <MenuItem onClick={() => {setFilter(array => [...array, prop.status])}} value={prop.status}>{prop.status}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                                Filter by Status
                            </FormHelperText>
                        </FormControl>
                        <Divider sx={{ mx: 3 }} orientation='vertical' />
                        <FormControl>
                            <InputLabel>Audited</InputLabel>
                            <Select>
                                <MenuItem value=''> </MenuItem>
                                {auditList.map((prop) => (
                                    <MenuItem onClick={() => {setFilter(array => [...array, `Audited: ${prop.audited}`])}} value={prop.audited}>{prop.audited}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                                Filter is Audited
                            </FormHelperText>
                        </FormControl>
                        <ButtonGroup sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: 2, ml: 3 }}>
                            <Button sx={{ mb: 1, borderRightColor: '#1976d2 !important', borderTopRightRadius: '.25em !important', borderBottomRightRadius: '.25em !important' }} onClick={() => setOpenFilter(false)} size='large' variant='outlined'>Close</Button>
                            <Button onClick={searchProperty} size='large' variant='outlined'>Filter</Button>
                        </ButtonGroup>
                        <Divider sx={{ mx: 3 }} orientation='vertical' />
                        <FormControl sx={{ ml: 10 ,width: '20em' }}>
                            <InputLabel>Address</InputLabel>
                            <Select >
                                <MenuItem value=''> </MenuItem>
                                {props.map((prop) => (
                                    <MenuItem onClick={() => {navigate(`/acquisitions/${prop._id}`)}}>{prop.address.replace(', USA', '')}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                                Find Property
                            </FormHelperText>
                        </FormControl>
                    </Box>
                </Slide>
            <OuterBar />
            <Container  maxWidth="2xl" sx={{ mt: 8, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }} >
            <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackBar} message='Property has been deleted' action={deleteAction} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} />
                <Toolbar sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                
                    <Button  onClick={() => setOpenFilter(!openFilter)} size='large' variant='outlined' sx={{ display: { xs: 'none', sm: 'inline-flex' } ,position: 'absolute', top: '1em', left: 1 }}>
                        Filters
                    </Button>
                <Paginate page={page} />
                <Box sx={{ position: 'absolute', right: 3, top: { xs: '-3.5em' , sm: 12}, height: { xs: 200, sm: 320}, zIndex: '5' }}>
                    <SpeedDial
                        ariaLabel="Forms"
                        icon={<SpeedDialIcon />}
                        direction='down'
                        
                    >
                        {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                        ))}
                    </SpeedDial>
                </Box>
                </Toolbar>
                <Grow in>
                    <Grid mt={2} className={classes.propertyContainer} container justify='space-between' alignItems='center' spacing={4}>
                            <Properties setOpen={setOpen} />
                    </Grid>
                </Grow>
            </Container>
            <MobileNav />
        </Box>
    </ThemeProvider>
  )
}

export default Acquisitions
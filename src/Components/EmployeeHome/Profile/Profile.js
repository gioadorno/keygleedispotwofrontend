import { Box, Paper, Grid, Button, Container, CardMedia, FormControl, FormLabel, InputLabel, Toolbar, Card, CardContent, CardActions, TextField, Typography  } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { getUsers, updateEmployee } from '../../../actions/employees';
import { useState, useEffect } from "react";
import OuterBar from '../OuterBar';
import FileBase64 from 'react-file-base64';
import emptyPhoto from './photo.png';
import MobileNav from '../MobileNav';
import Login from '../../Login/Login';

const Profile = () => {
    const [ saved, setSaved ] = useState(false);
    const [ passwordSaved, setPasswordSaved ] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers)
    },[getUsers])
    const { employees } = useSelector((state) => state.employees);
    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info
    const [ password, setPassword ] = useState({
        password: '',
        confirmPassword: ''
    })
    const updatePassword = { password: password.confirmPassword };
    const [profilePhoto, setProfilePhoto] = useState({
        profilePhoto: user.result.profilePhoto,
    });

    const savePhoto = () => {
        dispatch(updateEmployee(user.result._id, profilePhoto))
        setSaved(true)
    };
    const savePassword = () => {
        dispatch(updateEmployee(user.result._id, updatePassword))
        setPasswordSaved(true)
    };

    
    if(!user?.result?.name || user?.result?.accountLevel != 'Employee') {
        return (
            <Login />
        )
    };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#003558' }}>
        <OuterBar />
        <Container maxWidth="2xl" sx={{ mt: 10, mb: 4, display: 'flex', alignItems: 'center', width: '-webkit-fill-available', height: '100%' }} >
                <Grid spacing={1} container>
                    <Toolbar style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: '0em' }}>
                        <Typography variant='h2' sx={{ color: 'white' }}>Profile Settings</Typography>
                    </Toolbar>
                    <Grid item xs={12} sm={6}>
                        <Card variant='outlined' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '2em' }}>
                            <Box sx={{ width: { md: 300  , xl: '90%'}, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 5 }}>
                                <img style={{ height: '100%', width: '60%', marginBottom: '1em',  }} src={profilePhoto.profilePhoto != '' ? profilePhoto.profilePhoto : emptyPhoto} />

                            </Box>
                            <CardContent>
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em' }} >Upload a Profile Photo</FormLabel>
                                    <FileBase64 name="profilePhoto" type='file' onDone={(fileInfo) => setProfilePhoto({ ...profilePhoto, profilePhoto: fileInfo.base64 })} multiple={false}  />
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                <Button color={saved === true ? 'success' : 'primary'} onClick={savePhoto} variant='outlined'>Save Photo</Button>
                            </CardActions>
                                {saved === true && 
                                <InputLabel color='success'>
                                 Photo have been saved
                                </InputLabel>                        
                                }
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Card variant='outlined' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '2em' }}>
                            <Typography variant='h4' component='h4'>Change Password</Typography>
                            <CardContent>
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em' }} >New Password</FormLabel>
                                    <TextField type='password' name="password" onChange={e => setPassword({ ...password, password: e.target.value })} />
                                </FormControl>
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em' }} >Confirm Password</FormLabel>
                                    <TextField type='password' name="confirmPassword" onChange={e => setPassword({ ...password, confirmPassword: e.target.value })} />
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                {password.confirmPassword != '' && password.password === password.confirmPassword && 
                                <Button color={saved === true ? 'success' : 'primary'} onClick={savePassword} variant='outlined'>Update Password</Button>
                                }
                            </CardActions>
                                {passwordSaved === true && 
                                <InputLabel color='success'>
                                 Password has been updated
                                </InputLabel>                        
                                }
                        </Card>
                    </Grid>
                </Grid>
        </Container>
        <MobileNav />
    </Box>
  )
}

export default Profile
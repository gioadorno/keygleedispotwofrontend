import { Card, CardActions, CardContent, CardMedia, Typography, ButtonBase, Modal, ButtonGroup, Button, Box, IconButton,  } from '@material-ui/core';
import useStyles from './styles';
import DeleteIcon from '@mui/icons-material/Delete';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import emptyPhoto from './Empty Photo.png';
import moment from 'moment';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import { deleteProp } from '../../../../actions/properties';
import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';

import { Snackbar } from '@mui/material'



const Property = ({ prop, setOpen }) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info
    const navigate = useNavigate();
    const openProperty = () => {
        navigate(`/acquisitions/${prop._id}`);
    };
    const openDealText = () => {
        navigate(`/dealtext/${prop._id}`);
    };




    
    const [ deleteModal, setDeleteModal ] = useState(null);
    const handleClose = () => {
        setDeleteModal(false)
    };
    const deleteProperty = async () => {
        dispatch(deleteProp(prop._id)).then(() => setOpen(true));
    }



  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '15px', height: '100%', position: 'relative', alignItems: 'center', alignContent: 'center', '&:hover': { transform: 'scale(1.01)' }}}>
        <ButtonBase className={classes.cardAction} onClick={openProperty}> 
        <CardMedia className={classes.media} image={prop.propPhoto != '' ? prop.propPhoto : emptyPhoto} title={prop.address} />
        <div className={classes.overlay}>
            <Typography variant="h6">
                {prop.address.replace(', USA', '')}
            </Typography>
            <Typography variant="body2">
                {moment(prop.date).fromNow()}
            </Typography>
        </div>
        <div className={classes.details}>
            <Typography sx={{ textAlign: 'center' }} variant='body2' color='textSecondary'>
                Acq: {prop.name} | Dispo: {prop.dispoName}
            </Typography>
        </div>
        <div className={classes.address}>
            <Typography className={classes.title} variant="body3" gutterBottom>
                Beds: {prop.beds} | Baths: {prop.baths} | Parking: {prop.parking} | Pool: {prop.pool}
            </Typography>
        </div>
        <CardContent>
            {prop.status === 'Active' ? (
                <Typography variant='h6' style={{ color: '#00ff00' }}>
                    Active
                </Typography>
            ) : prop.status === 'Pending' ?
            <Typography  variant='h6' style={{ color: 'orange' }}>
                    Pending
            </Typography> 
            : prop.status === 'Closed' ? (
                <Typography  variant='h6' style={{ color: '#20b7b7' }}>
                    Closed
                </Typography>
            )
            : prop.status === 'Cancelled' && (
                <Typography  variant='h6' style={{ color: 'red' }}>
                    Cancelled
                </Typography>
            )
        }
            <br/>
            Wholesale Price: {prop.netPrice}
            <br/>
            After Repair Value: {prop.arv}
        </CardContent>
        </ButtonBase>
        <CardActions style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }} >
            {/* <Button size='small' color='primary' startIcon={<EditIcon />} >
                Prop Details
            </Button> */}
            {user.result.securityLevel != 'Acq' && 'Dispo' ? (
            <Button onClick={() => setDeleteModal(!deleteModal)} size='small' color='primary' endIcon={<DeleteIcon />} >
                Delete
            </Button>
            ) :
            <Button size='small' color='primary' disabled endIcon={<DeleteIcon />} >
            Delete
            </Button>
            }
            <Button onClick={openDealText} size='small' color='primary' endIcon={<TextSnippetIcon />} >
                Deal Text
            </Button>
        </CardActions>
            <Modal open={deleteModal} style={{ zIndex: '10', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }} onClose={handleClose}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '30%', height: '30%', backgroundColor: 'white' }}>
                    <Typography>
                        Are you sure you want to delete this property?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
                        <Button onClick={() => setDeleteModal(null)} size='medium' color='primary'>
                            No
                        </Button>
                        <Button onClick={deleteProperty} size='medium' color='primary'>
                            Yes
                        </Button>
                    </Box>  
                </Box>
            </Modal>
            
    </Card>
  )
}

export default Property
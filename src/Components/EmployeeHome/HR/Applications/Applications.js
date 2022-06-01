import { Box, Container, Paper, Fade, Typography, Divider, TextField, Button, Modal } from "@mui/material";
import MobileNav from "../../MobileNav";
import OuterBar from '../../OuterBar';
import { useState, useEffect } from "react";
import { getApplications, updateApplication } from '../../../../actions/applications';
import { useDispatch, useSelector } from "react-redux";
import NotAuthorized from "../../NotAuthorized";

const Applications = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [ application, setApplication ] = useState(null);
    const [ openResume, setOpenResume ] = useState(false);
    const date = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' , hour12: true });
    const [ note, setNote ] = useState({
        name: user.result.name,
        date: date,
        note: ''
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getApplications())
    },[]);
    const applications = useSelector((state) => state.applications);

    const submitNote = async () => {
        document.querySelector('.noteButton').style.display = 'none';
        document.querySelector('.noteButton2').style.display = 'flex';
        dispatch(updateApplication(application._id, note));
        window.location.reload(false);
    };

    if(!user?.result?.name || user?.result?.securityLevel != 'System Administrator' && user?.result?.securityLevel != 'HR') {
        return (
            <NotAuthorized />
        )
    };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#003558' }}>
        <OuterBar />
        <Container maxWidth="2xl" sx={{ mt: 10, mb: 4, display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'flex-start', flexDirection: 'column' }}>
            {application === null && 
            <Fade in={application === null} timeout={600}>
                <Box sx={{ width: '90%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper sx={{ height: '95%', width: { xs: '100%', sm: '50%' }, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 4 }}>
                        <Typography variant='h4' sx={{ py: 2, textAlign: 'center' }}>Applications</Typography>
                        <Divider sx={{ width: '100%' }} />
                        {applications.map((applicant) => (
                            <>
                                <Box key={applicant._id} onClick={() => setApplication(applicant)} sx={{ cursor: 'pointer', p: 3, display: 'flex', '&:hover' : { transform: 'scale(1.05)', filter: 'contrast(.8)' }, justifyContent: 'space-between', width: '100%', height: 100 }}>
                                    <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pl: 5  }}>
                                        <Typography variant='h5'>{applicant.name}</Typography>
                                        <Typography sx={{ pt: 2 }} variant='h6'>{applicant.position}</Typography>
                                    </Box>
                                    <Box sx={{ width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Typography variant='body2'>{applicant.date}</Typography>
                                    </Box>
                                </Box>
                                <Divider sx={{ width: '80%' }} />
                            </>
                        ))}
                    </Paper>
                </Box>
            </Fade>
            }
            {application &&
            <Fade timeout={500} in={application}>
                <Box sx={{ width: {xs: '100%', sm: '90%'}, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper sx={{ height: '95%', width: { xs: '100%', sm: '90%' }, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 4, position: 'relative', borderRadius: '1em', overflowY: 'auto' }}>
                        <Typography onClick={() => setApplication(null)} sx={{ color: 'gray', position: 'absolute', p: 1, top: 1, left: 1, cursor: 'pointer', '&:hover' : { transform: 'scale(1.05)', color: '#2e2e2e' } }}>View other Applications</Typography>
                        <Typography variant='h4' sx={{ py: 4, textAlign: 'center', fontSize: { xs: '1.6em', xl: '2em' } }}>Application for <span style={{ color: '#277bb7', fontStyle: 'italic' }}>{application.position}</span></Typography> 
                        <Divider sx={{ width: '100%' }} />
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, height: '80%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', px: 2, width: { xs: '100%', sm: '60%' } }}>
                                    <Typography sx={{ pt: 3, fontSize: { xs: '1.2em', xl: '1.5em' } }} variant='h5'>Applicant's Name: <span style={{color: '#277bb7' }} >{application.name}</span></Typography>
                                    <Typography sx={{ pt: 3, fontSize: { xs: '1.2em', xl: '1.5em' } }} variant='h5'>Phone Number: <a href={`tel:${application.phone}`} style={{ color: '#277bb7' }}>{application.phone}</a></Typography>
                                    <Typography sx={{ pt: 3, fontSize: { xs: '1.2em', xl: '1.5em' } }} variant='h5'>Email Address: <a href={`mailto:${application.email}`} style={{ color: '#277bb7' }}>{application.email}</a></Typography>
                                    <Typography sx={{ width: '100%', pt: 3, fontSize: { xs: '1.2em', xl: '1.5em' } }} variant='h5'>Resume: {application.resume != '' && 
                                    <Typography variant='body' onClick={() => setOpenResume(true)} sx={{ color: '#277bb7', cursor: 'pointer', '&:hover': { transform: 'scale(1.1)', color: 'red' } }}>Open Resume</Typography>
                                    }
                                    </Typography>
                                    <Typography sx={{ pt: 3, fontSize: { xs: '1.2em', xl: '1.5em' } }} variant='h5'>Real Estate Experience: <span style={{ color: '#277bb7' }}>{application.experience}</span></Typography>
                                    <Typography sx={{ pt: 3, fontSize: { xs: '1.2em', xl: '1.5em' } }} variant='h5'>Real Estate License: <span style={{ color: '#277bb7' }}>{application.license}</span></Typography>
                                </Box>
                                <Divider orientation="vertical" sx={{ height: {sm: '100%'}, display: { xs: 'none', sm: 'flex' } }} />
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 2, alignItems: 'flex-start', width: '100%' }}>
                                    <Box sx={{ width: '100%', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', pt: 3 }}>
                                    <Typography variant='h5'>Notes:</Typography>
                                    {application.notes?.map((note) => (
                                        <Box key={note._id} sx={{ display: 'flex', width: '100%', height: 'auto', position: 'relative', flexDirection: 'column' }}>
                                                    <Modal sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center' }} open={openResume} onClose={() => setOpenResume(false)}>
                                                        <object data={application.resume} type='application/pdf' width='80%' height='100%'>
                                                            <Typography sx={{ color: 'white' }}>No Resume here</Typography>
                                                        </object>
                                                    </Modal>
                                            <Typography sx={{ color: '#277bb7', width: '100%', py: 2, pb: 4 }} variant='body'>{note.note}</Typography>
                                            <Typography sx={{ color: 'gray', position: 'absolute', left: 2, bottom: 0 }} variant='body'>{note.name}</Typography>
                                            <Typography sx={{ color: 'gray', position: 'absolute', right: 3, bottom: 0 }} variant='body'>{note.date}</Typography>
                                            <Divider sx={{ width: '100%', pt: 1 }} />
                                        </Box>
                                    ))}
                                    </Box>
                                </Box>
                            </Box>
                            <Divider sx={{ width: '100%', py: 2 }} />
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                                <TextField onChange={e => setNote({ ...note, note: e.target.value })} multiline rows={8} sx={{ width: '80%', pb: 4  }} />
                                <Button className='noteButton' onClick={submitNote} variant='outlined'>Add Note</Button>
                                <Button sx={{ display: 'none' }} className='noteButton2' disabled variant='outlined'>Note Added</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Fade>
            }
        </Container>
        <MobileNav />
    </Box>
  )
}

export default Applications
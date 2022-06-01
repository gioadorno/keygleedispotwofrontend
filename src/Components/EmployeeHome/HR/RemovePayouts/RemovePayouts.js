import { Box, Container, Snackbar, Modal, Typography, ButtonGroup, Button, Paper, IconButton } from "@mui/material";
import MobileNav from "../../MobileNav";
import OuterBar from "../../OuterBar";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, Fragment } from "react";
import { getPayoutData, deletePayout } from "../../../../actions/payoutdata";
import NotAuthorized from "../../NotAuthorized";
import CloseIcon from '@mui/icons-material/Close';

const RemovePayouts = () => {
    let data = useSelector((state) => state.payoutData);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ getId, setGetId ] = useState(null);
    const [ open, setOpen ] = useState(false);

    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPayoutData())
    },[])
    const columns = [
        { field: 'month', headerName: 'Month', width: 200 },
        {
          field: 'employee',
          headerName: `Employee`,
          width: 250,
          editable: false,
          sortable: true,
        },
        {
          field: 'paid',
          headerName: 'Paid',
          width: 250,
          editable: false,
          sortable: true,
        },
        {
          field: 'grossProfit',
          headerName: 'Gross Profit',
          width: 250,
          editable: false,
          sortable: true,
        },
        {
          field: 'delete',
          headerName: 'Delete',
          width: 250,
          renderCell: (params) => (
            <Button size='small' variant='outlined' onClick={() => {
                setDeleteModal(true)
                setGetId(params.value)
            }} endIcon={<DeleteIcon />} >Delete</Button>
          )
        },
    
      ];

      if(!user?.result?.name || user?.result?.securityLevel != 'System Administrator' && user?.result?.securityLevel != 'HR') {
        return (
            <NotAuthorized />
        )
    };

    const handleClose = () => {
        setDeleteModal(false);
    };
    const closeSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const payoutAction = (
        <Fragment>
          <IconButton
            size="large"
            aria-label="close"
            sx={{ color: 'white' }}
            onClick={closeSnack}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Fragment>
      );

    const handleDelete = async () => {
        dispatch(deletePayout(getId));
        setDeleteModal(false);
        setOpen(true);
    }

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#003558' }}>
        <Snackbar open={open} autoHideDuration={5000} onClose={closeSnack} message='Payout has been deleted' action={payoutAction} />
        <Modal sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} open={deleteModal} onClose={handleClose} >
            <Box sx={{ bgcolor: 'white', display: 'flex', boxShadow: 5, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', pb: 5 }}>
                <Typography variant='h6' sx={{ textAlign: "center", p: 5 }}>Are you sure you want to delete this Payout?</Typography>
                <ButtonGroup>
                    <Button onClick={handleDelete} sx={{ px: 5 }} variant='outlined'>
                        Yes
                    </Button>
                    <Button onClick={handleClose} sx={{ px: 5 }} variant='outlined'>
                        No
                    </Button>
                </ButtonGroup>
            </Box>
        </Modal>
        <OuterBar />
        <Container maxwidth='2xl' sx={{ display: 'flex', pt: 10, flexDirection: 'column', pb: 10 }}>
            <Paper sx={{ width: '100%', height: '100%', boxShadow: 10 }}>
                <DataGrid 
                    rows={data?.map((person) => { return {id: person._id, month: person.month, employee: person.name, paid: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(person.paid), grossProfit: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(person.grossProfit), delete: person._id } })}
                    
                    columns={columns}
                    />

            </Paper>
        </Container>
        <MobileNav />
    </Box>
  )
}

export default RemovePayouts
import { StylesProvider, Modal, ButtonGroup, Button, Box, Typography } from '@material-ui/core';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import Property from './Property/Property';
import { getProps } from '../../../actions/properties';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Properties = ({ setOpen }) => {

  const { props, isLoading, isDeleting } = useSelector((state) => state.posts);

  return (
    <>
        {isLoading ? <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 10 }}><p>Properties Loading...</p><LinearProgress sx={{ pt: 5 }} color='success' /></Stack> :
        (props.map((prop) => (
          <StylesProvider key={prop._id} injectFirst>
            <Grid sx={{ '&:hover': { transform: 'scale(1.02)' } }} item xs={12} sm={3}>
                <Property setOpen={setOpen} prop={prop} />
            </Grid>
          </StylesProvider>
        )))
        }
    </>
  )
}

export default Properties
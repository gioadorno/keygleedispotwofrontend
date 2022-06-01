import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const updateEMD = { emd: '' };

const EMD = ({ prop, id, dispatch }) => {

    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
      <NumberFormat label='Our Earnest Amount' customInput={TextField} defaultValue={prop.emd} onValueChange={({ value }) => dispatch(updateProp(id, {emd: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Our Earnest Amount' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.emd} />
        </FormControl>
  )
}

export default EMD
import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const PerDiem = ({ prop, id, dispatch }) => {

    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
      <NumberFormat label='Per Diem Charged to Buyer' customInput={TextField} defaultValue={prop.perDiem} onValueChange={({ value }) => dispatch(updateProp(id, {perDiem: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Per Diem Charged to Buyer' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.perDiem} />
        </FormControl>
  )
}

export default PerDiem
import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const DispoPriceDrop = ({ prop, id, dispatch }) => {

    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
<NumberFormat label='Dispo Price Drops' customInput={TextField} defaultValue={prop.dispoPriceDrop} onValueChange={({ value }) => dispatch(updateProp(id, {dispoPriceDrop: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Dispo Price Drop' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.dispoPriceDrop} />
        </FormControl>
  )
}

export default DispoPriceDrop
import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const SecondLegDebits = ({ prop, id, dispatch }) => {

    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
      <NumberFormat label='2nd Leg Debits' customInput={TextField} defaultValue={prop.secondLegDebits} onValueChange={({ value }) => dispatch(updateProp(id, {secondLegDebits: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='2nd Leg Debits' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.secondLegDebits} />
        </FormControl>
  )
}

export default SecondLegDebits
import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const SecondLegCredits = ({ prop, id, dispatch }) => {

    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
      <NumberFormat label='2nd Leg Credits' customInput={TextField} defaultValue={prop.secondLegCredits} onValueChange={({ value }) => dispatch(updateProp(id, {secondLegCredits: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='2nd Leg Credits' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.secondLegCredits} />
        </FormControl>
  )
}

export default SecondLegCredits
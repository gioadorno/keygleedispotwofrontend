import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const AdditionalCost = ({ prop, id, dispatch }) => {
    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <NumberFormat label='Additional Cost' customInput={TextField} defaultValue={prop.additionalCost} onValueChange={({ value }) => dispatch(updateProp(id, {additionalCost: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Additional Cost' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.additionalCost} />
        </FormControl>
  )
}

export default AdditionalCost
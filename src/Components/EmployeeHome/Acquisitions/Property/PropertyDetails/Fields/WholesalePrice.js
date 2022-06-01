import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const NetPrice = ({ prop, id, dispatch }) => {

    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
      <NumberFormat label='Wholesale Price' customInput={TextField} defaultValue={prop.netPrice} onValueChange={({ value }) => dispatch(updateProp(id, {netPrice: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Wholesale Price' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.netPrice} />
        </FormControl>
  )
}

export default NetPrice
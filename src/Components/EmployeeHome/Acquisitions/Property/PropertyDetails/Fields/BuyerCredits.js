import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const BuyerCredits = ({ prop, id, dispatch }) => {

    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <NumberFormat label='Buyer Credits' customInput={TextField} defaultValue={prop.buyerCredits} onValueChange={({ value }) => dispatch(updateProp(id, {buyerCredits: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Buyer Credits' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.buyerCredits} />
        </FormControl>
  )
}

export default BuyerCredits
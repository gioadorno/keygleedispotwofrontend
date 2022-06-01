import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const DispoContractPrice = ({ prop, id, dispatch }) => {

    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <NumberFormat label='Dispo Contract Price' customInput={TextField} defaultValue={prop.dispoContractPrice.replace('$', '')} onValueChange={({ value }) => dispatch(updateProp(id, {dispoContractPrice: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Dispo Contract Price' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.dispoContractPrice} />
        </FormControl>
  )
}

export default DispoContractPrice
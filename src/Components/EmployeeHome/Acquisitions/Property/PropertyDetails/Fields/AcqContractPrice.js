import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const AcqContractPrice = ({ prop, id, dispatch }) => {

    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
      <NumberFormat id='acqContract' label='Acq Contract Price' customInput={TextField} defaultValue={prop.salePrice} onValueChange={({ value }) => dispatch(updateProp(id, {salePrice: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField  label='Acq Contract Price' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.salePrice} />
        </FormControl>
  )
}

export default AcqContractPrice
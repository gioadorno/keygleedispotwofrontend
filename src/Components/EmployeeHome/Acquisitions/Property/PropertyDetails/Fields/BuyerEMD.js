import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const BuyerEMD = ({ prop, id, dispatch, user }) => {

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <NumberFormat label="Buyer's EMD Amount" customInput={TextField} defaultValue={prop.buyerEMD} onValueChange={({ value }) => dispatch(updateProp(id, {buyerEMD: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label="Buyer's EMD Amount" variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.buyerEMD} />
        </FormControl>
  )
}

export default BuyerEMD
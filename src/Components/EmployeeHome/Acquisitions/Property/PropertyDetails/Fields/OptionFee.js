import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const OptionFee = ({ prop, id, dispatch, user }) => {

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
      <NumberFormat label='Option Fee' customInput={TextField} defaultValue={prop.optionFee} onValueChange={({ value }) => dispatch(updateProp(id, {optionFee: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Option Fee' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.optionFee} />
        </FormControl>
  )
}

export default OptionFee
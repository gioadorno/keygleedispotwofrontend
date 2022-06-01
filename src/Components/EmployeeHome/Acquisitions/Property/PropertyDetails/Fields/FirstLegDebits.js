import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const FirstLegDebits = ({ prop, id, dispatch, user }) => {

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
      <NumberFormat label='First Leg Debits' customInput={TextField} defaultValue={prop.firstLegDebits} onValueChange={({ value }) => dispatch(updateProp(id, {firstLegDebits: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='First Leg Debits' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.firstLegDebits} />
        </FormControl>
  )
}

export default FirstLegDebits
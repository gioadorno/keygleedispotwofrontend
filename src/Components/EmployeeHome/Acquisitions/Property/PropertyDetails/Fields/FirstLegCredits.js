import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const FirstLegCredits = ({ prop, id, dispatch, user }) => {

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
      <NumberFormat label='First Leg Credits' customInput={TextField} defaultValue={prop.firstLegCredits} onValueChange={({ value }) => dispatch(updateProp(id, {firstLegCredits: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='First Leg Credits' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.firstLegCredits} />
        </FormControl>
  )
}

export default FirstLegCredits
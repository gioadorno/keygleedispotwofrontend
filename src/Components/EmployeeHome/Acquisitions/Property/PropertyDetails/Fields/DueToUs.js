import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const DueToUs = ({ prop, id, dispatch }) => {

    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
      <NumberFormat label='Due to Us' customInput={TextField} defaultValue={prop.dueToUs} onValueChange={({ value }) => dispatch(updateProp(id, {dueToUs: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Due to Us' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.dueToUs} />
        </FormControl>
  )
}

export default DueToUs
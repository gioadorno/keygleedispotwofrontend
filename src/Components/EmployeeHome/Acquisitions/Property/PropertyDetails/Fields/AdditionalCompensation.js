import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const AddComp = ({ prop, id, dispatch }) => {
    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <NumberFormat label='Additional Compensation' customInput={TextField} defaultValue={prop.addComp} onValueChange={({ value }) => dispatch(updateProp(id, {addComp: value }))} thousandSeparator isNumericString prefix="$" />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Additional Compensation' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.addComp} />
        </FormControl>
  )
}

export default AddComp
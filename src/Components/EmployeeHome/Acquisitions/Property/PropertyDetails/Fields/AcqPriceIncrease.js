import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl} from '@mui/material';

const AcqPriceIncrease = ({ prop, id, dispatch }) => {
    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <NumberFormat label='Acq Price Increase' customInput={TextField} defaultValue={prop.acqIncrease} onValueChange={({ value }) => dispatch(updateProp(id, {acqIncrease: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Acq Price Increase' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.acqIncrease} />
        </FormControl>
  )
}

export default AcqPriceIncrease
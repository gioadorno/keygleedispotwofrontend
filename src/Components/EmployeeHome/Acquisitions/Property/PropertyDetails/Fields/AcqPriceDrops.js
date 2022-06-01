import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl} from '@mui/material';

const AcqPriceDrops = ({ prop, id, dispatch }) => {
    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
      <NumberFormat label='Acq Price Drops' customInput={TextField} defaultValue={prop.acqDrop} onValueChange={({ value }) => dispatch(updateProp(id, {acqDrop: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Acq Price Drops' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.acqDrop} />
        </FormControl>
  )
}

export default AcqPriceDrops
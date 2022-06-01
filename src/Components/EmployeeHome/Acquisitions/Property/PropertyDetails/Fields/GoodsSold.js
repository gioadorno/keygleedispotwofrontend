import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl } from '@mui/material';

const GoodsSold = ({ prop, id, dispatch }) => {

    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
      <NumberFormat label='Goods Sold' customInput={TextField} defaultValue={prop.goodsSold} onValueChange={({ value }) => dispatch(updateProp(id, {goodsSold: value }))} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Goods Sold' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.goodsSold} />
        </FormControl>
  )
}

export default GoodsSold
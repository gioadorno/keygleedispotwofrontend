import { TextField, FormControl } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const Payouts = ({ prop, id, dispatch, user }) => {
    const handlePayouts = (e) => {
        dispatch(updateProp(id, {payouts: e.target.value}));
    };

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField label='Payouts' variant='outlined' defaultValue={prop.payouts} onChange={handlePayouts} />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Payouts' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.payouts} />
        </FormControl>
  )
}

export default Payouts
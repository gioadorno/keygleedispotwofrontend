import { TextField, FormControl } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const PayoutRecipient = ({ prop, id, dispatch, user }) => {
    const handlePayoutRecipient = (e) => {
        dispatch(updateProp(id, {payoutRecipient: e.target.value}));
    };

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField label='Payout Recipient' variant='outlined' defaultValue={prop.payoutRecipient} onChange={handlePayoutRecipient} />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Payout Recipient' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.payoutRecipient} />
        </FormControl>
  )
}

export default PayoutRecipient
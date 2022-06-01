import { TextField, FormControl } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const SecondEscrow = ({ prop, id, dispatch, user }) => {
    const handleSecondEscrow = (e) => {
        dispatch(updateProp(id, {secondEscrow : e.target.value}));
    };

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField id='standard-search' label='Escrow Officer (Second Leg)' variant='outlined' defaultValue={prop.secondEscrow} onChange={handleSecondEscrow} />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField id='standard-search' label='Escrow Officer (Second Leg)' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.secondEscrow} />
        </FormControl>
  )
}

export default SecondEscrow
import { TextField, FormControl } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const Commissions = ({ prop, id, dispatch, user }) => {
    const handleCommissions = (e) => {
        dispatch(updateProp(id, {commissions: e.target.value}));
    };

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField label='Commissions' variant='outlined' defaultValue={prop.commissions} onChange={handleCommissions}/>
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Commissions' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.commissions} />
        </FormControl>
  )
}

export default Commissions
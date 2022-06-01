import { TextField, FormControl } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const SoldGP = ({ prop, id, dispatch, user }) => {
    const handleSoldGP = (e) => {
        dispatch(updateProp(id, {soldGP: e.target.value}));
    };

  return (
      user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ?
    <FormControl size="medium" style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField onChange={handleSoldGP} id="standard-read-only-input" label="Sold GP" defaultValue={prop.soldGP} variant="outlined"/>
    </FormControl>
    :
    <FormControl size="medium" sx={{ width: '100%', mb: 2 }} >
    <TextField color='primary' id="standard-read-only-input" label="Sold GP" InputProps={{readOnly: true, style: { borderColor: '#0082a9b0 !important' }}} value={prop.soldGP} variant="outlined"/>
</FormControl>
  )
}

export default SoldGP
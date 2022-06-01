import { TextField, FormControl } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";


const EMDCheck = ({ prop, id, dispatch }) => {

    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info

    const handleEmdCheck = (e) => {
        dispatch(updateProp(id, {emdCheck: e.target.value}));
    };


  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField label='EMD Check/Wire Transaction Number' variant='outlined' defaultValue={prop.emdCheck} onChange={handleEmdCheck} />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='EMD Check/Wire Transaction Number' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.emdCheck} />
        </FormControl>
  )
}

export default EMDCheck
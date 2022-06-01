import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const Territory = ({ prop, id, dispatch, user }) => {

    const handleTerritory = (e) => {
        dispatch(updateProp(id, {territory: e.target.value}));
    };
  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? (
        <FormControl sx={{ width: '100%', mb: 2 }} variant='outlined'>
            <InputLabel variant='outlined'>Outside Territory</InputLabel>
            <Select sx={{ borderColor: '#0055a1bf' }} name='territory' labelId="territory" id="territory" label='Outside Territory' defaultValue={prop.territory} onChange={handleTerritory} >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='No'>No</MenuItem>
            </Select>
        </FormControl>
        ) :
        <FormControl sx={{ width: '100%', mb: 2 }} variant='outlined'>
        <InputLabel variant='outlined'>Outside Territory</InputLabel>
        <Select label='Outside Territory' disabled defaultValue={prop.territory} />
        </FormControl>
        
  )
}

export default Territory
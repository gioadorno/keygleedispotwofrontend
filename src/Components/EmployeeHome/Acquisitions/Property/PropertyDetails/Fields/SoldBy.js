import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const SoldBy = ({ prop, id, dispatch, user }) => {
  const handleSoldBy = (e) => {
      dispatch(updateProp(id, {soldBy: e.target.value}));
  };

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? (
      <FormControl style={{ marginBottom: '1em' }} sx={{ width: '100%', mb: 3 }} variant='outlined'>
          <InputLabel variant='outlined'>Sold By</InputLabel>
          <Select variant='outlined' label='Sold By' labelId="Sold By" defualtValue={prop.soldBy} onChange={handleSoldBy}>
          <MenuItem value=''>
              
          </MenuItem>
          <MenuItem value='Call/Text'>
              Call/Text
          </MenuItem>

          </Select>
      </FormControl>
      ) :
      <FormControl sx={{ width: '100%', mb: 2 }} variant='outlined'>
      <InputLabel variant='outlined'>Sold By</InputLabel>
      <Select label='Sold By' variant='outlined' disabled defaultValue={prop.soldBy} />
      </FormControl>
  )
}

export default SoldBy
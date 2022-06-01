import { updateProp } from "../../../../../../actions/properties";
import { TextField, FormControl } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';

const WhoSold = ({ prop, id, dispatch, user }) => {

    const { props } = useSelector((state) => state.posts)
    // Removes Duplicates of Dispo Names
    const dispoNameList = props.filter((value, index, self) => 
    index === self.findIndex((t) => (
        t.dispoName === value.dispoName
    ))
    );
  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <Autocomplete defaultValue={prop.whoSold} freeSolo={true} style={{ width: '100%' }} id="combo-box" options={dispoNameList.map((prop) => prop.dispoName)} renderInput={(params) => <TextField variant='outlined' {...params} label="Who Sold this Property"  />} onInputChange={(e, value) => dispatch(updateProp(id, {whoSold: value}))} />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Who Sold this Property' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.whoSold} />
        </FormControl>
  )
}

export default WhoSold
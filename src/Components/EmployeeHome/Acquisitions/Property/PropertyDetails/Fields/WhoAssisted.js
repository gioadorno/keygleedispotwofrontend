import { useEffect } from 'react';
import { updateProp } from "../../../../../../actions/properties";
import { TextField, FormControl } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';
import { getUsers } from '../../../../../../actions/employees';

const WhoAssisted = ({ prop, id, dispatch, user }) => {

    useEffect(() => {
        dispatch(getUsers)
    }, [])

    const {employees} = useSelector((state) => state.employees);
    // Removes Duplicates of Dispo Names
    const users = employees.filter((value, index, self) => 
    index === self.findIndex((t) => (
        t.name === value.name
    ))
    );
  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <Autocomplete defaultValue={prop.whoAssisted} freeSolo={true} style={{ width: '100%' }} id="combo-box" options={users.map((prop) => prop.name)} renderInput={(params) => <TextField variant='outlined' {...params} label="Who Assisted this Sale"  />} onInputChange={(e, value) => dispatch(updateProp(id, {whoAssisted: value}))} />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Who Assisted this Sale' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.whoAssisted} />
        </FormControl>
  )
}

export default WhoAssisted
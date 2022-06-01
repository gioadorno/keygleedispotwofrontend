import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";


const FileType = ({ prop, id, dispatch }) => {
    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info
    const handleFileType = (e) => {
        dispatch(updateProp(id, {fileType: e.target.value}));
    };

  return (
        user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? (
        <FormControl sx={{ width: '100%', mb: 2 }} variant='outlined'>
            <InputLabel>File Type</InputLabel>
            <Select label='File Type'  defaultValue={prop.fileType === '' ? '' : prop.fileType} onChange={handleFileType} >
                <MenuItem value='Directly Under Contract Traditional Wholesale'>Directly Under Contract Traditional Wholesale</MenuItem>
                <MenuItem value='Exclusive Option Traditional Wholesale'>Exclusive Option Traditional Wholesale</MenuItem>
                <MenuItem value='Directly Under Contract Traditional Wholesale'>Directly Under Contract Traditional Wholesale</MenuItem>
                <MenuItem value='Exclusive Option Traditional Wholesale'>Exclusive Option Traditional Wholesale</MenuItem>
            </Select>
        </FormControl>
        ) :
        <FormControl sx={{ width: '100%', mb: 2 }} variant='outlined'>
        <Select label='File Type' disabled defaultValue={prop.fileType} />
        </FormControl>
        
  )
}

export default FileType
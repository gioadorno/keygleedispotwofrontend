import { TextField, FormControl } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const FileNotes = ({ prop, id, dispatch, user }) => {
    const handleFileNotes = (e) => {
        dispatch(updateProp(id, {fileNotes: e.target.value}));
    };

  return (
user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField id='standard-search' label='File Notes' variant='outlined' defaultValue={prop.fileNotes} onChange={handleFileNotes} />
        </FormControl>
        :
            <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
                <TextField id='standard-search' label='File Notes' variant='outlined' InputProps={{
                readOnly: true,
            }} value={prop.fileNotes} />
            </FormControl>
  )
}

export default FileNotes
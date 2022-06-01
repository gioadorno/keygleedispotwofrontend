import { TextField, FormControl } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const PostPossession = ({ prop, id, dispatch, user }) => {
    const handlePostPossession = (e) => {
        dispatch(updateProp(id, {postPossession: e.target.value}));
    };

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField label='Lease/Post Possession Terms' variant='outlined' defaultValue={prop.postPossession} onChange={handlePostPossession} />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Lease/Post Possession Terms' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.postPossession} />
        </FormControl>
  )
}

export default PostPossession
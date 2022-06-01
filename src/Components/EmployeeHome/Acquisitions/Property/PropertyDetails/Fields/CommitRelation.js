import { TextField, FormControl } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const CommitRelation = ({ prop, id, dispatch }) => {
    const handleCommitRelation = (e) => {
        dispatch(updateProp(id, {commitRelation: e.target.value}));
    };

  return (
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField onChange={handleCommitRelation} id="standard-read-only-input" label="Commitments & Purchases Relationship" defaultValue={prop.commitRelation} variant="outlined"/>
    </FormControl>
  )
}

export default CommitRelation